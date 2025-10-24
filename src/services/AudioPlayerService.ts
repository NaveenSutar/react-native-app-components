import Sound from 'react-native-nitro-sound';
import RNFS from 'react-native-fs';
import {WavFileEncoder} from '../utils/WavFileEncoder';

export interface AudioPlayerConfig {
  onPlaybackComplete?: () => void;
  onError?: (error: Error) => void;
}

export class AudioPlayerService {
  private playbackQueue: string[] = [];
  private isPlaying = false;
  private config: AudioPlayerConfig;
  private wavEncoder: WavFileEncoder;

  constructor(config: AudioPlayerConfig = {}) {
    this.config = config;
    this.wavEncoder = new WavFileEncoder({
      sampleRate: 16000, // 16kHz as per backend spec
      numChannels: 1, // Mono
      bitsPerSample: 16, // 16-bit
    });
  }

  /**
   * Add audio chunk to the playback queue
   */
  addToQueue(base64Audio: string): void {
    console.log(
      '[AudioPlayer] Adding chunk to queue, size:',
      base64Audio.length,
    );
    this.playbackQueue.push(base64Audio);

    // Start playing if not already playing
    if (!this.isPlaying) {
      this.playNext();
    }
  }

  /**
   * Play the next audio chunk in the queue
   */
  private async playNext(): Promise<void> {
    if (this.playbackQueue.length === 0) {
      this.isPlaying = false;
      this.config.onPlaybackComplete?.();
      console.log('[AudioPlayer] Queue empty, playback complete');
      return;
    }

    this.isPlaying = true;
    const base64Audio = this.playbackQueue.shift()!;

    try {
      await this.playAudioChunk(base64Audio);
      // Play next chunk after current one finishes
      this.playNext();
    } catch (error) {
      console.error('[AudioPlayer] Error playing chunk:', error);
      this.config.onError?.(error as Error);
      // Continue with next chunk even if this one fails
      this.playNext();
    }
  }

  /**
   * Play a single audio chunk
   */
  private async playAudioChunk(base64Audio: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('[AudioPlayer] Playing chunk...');

        // Convert raw PCM to WAV format with proper headers
        const wavBase64 = this.wavEncoder.pcmToWav(base64Audio);

        // Create a temporary file to store the audio data
        const tempFilePath = `${
          RNFS.CachesDirectoryPath
        }/temp_audio_${Date.now()}.wav`;

        // Write the WAV audio to a file
        await RNFS.writeFile(tempFilePath, wavBase64, 'base64');

        console.log('[AudioPlayer] WAV file created:', tempFilePath);

        // Set up playback end listener
        Sound.addPlaybackEndListener(() => {
          console.log('[AudioPlayer] Chunk playback complete');
          Sound.removePlaybackEndListener();

          // Clean up temp file
          RNFS.unlink(tempFilePath).catch(err =>
            console.warn('[AudioPlayer] Failed to delete temp file:', err),
          );

          resolve();
        });

        // Start playback
        const result = await Sound.startPlayer(tempFilePath);
        console.log('[AudioPlayer] Playback started:', result);
      } catch (error) {
        console.error('[AudioPlayer] Failed to play audio chunk:', error);
        Sound.removePlaybackEndListener();
        reject(error);
      }
    });
  }

  /**
   * Stop current playback and clear queue
   */
  async stopPlayback(): Promise<void> {
    console.log('[AudioPlayer] Stopping playback...');
    this.playbackQueue = [];
    this.isPlaying = false;

    try {
      await Sound.stopPlayer();
      Sound.removePlaybackEndListener();
    } catch (error) {
      console.error('[AudioPlayer] Error stopping playback:', error);
    }
  }

  /**
   * Pause current playback
   */
  async pausePlayback(): Promise<void> {
    try {
      await Sound.pausePlayer();
      console.log('[AudioPlayer] Playback paused');
    } catch (error) {
      console.error('[AudioPlayer] Error pausing playback:', error);
    }
  }

  /**
   * Resume playback
   */
  async resumePlayback(): Promise<void> {
    try {
      await Sound.resumePlayer();
      console.log('[AudioPlayer] Playback resumed');
    } catch (error) {
      console.error('[AudioPlayer] Error resuming playback:', error);
    }
  }

  /**
   * Check if currently playing
   */
  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Get queue size
   */
  getQueueSize(): number {
    return this.playbackQueue.length;
  }

  /**
   * Clear the playback queue without stopping current playback
   */
  clearQueue(): void {
    this.playbackQueue = [];
    console.log('[AudioPlayer] Queue cleared');
  }

  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    await this.stopPlayback();
  }
}
