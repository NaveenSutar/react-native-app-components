import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';

export interface AudioRecorderConfig {
  sampleRate?: number;
  channels?: number;
  bitsPerSample?: number;
  audioSource?: number;
  onAudioData?: (base64Audio: string) => void;
  onError?: (error: Error) => void;
}

export class AudioRecorderService {
  private isRecording = false;
  private recordingPath: string | null = null;
  private config: AudioRecorderConfig;
  private audioRecord: typeof AudioRecord | null = null;

  constructor(config: AudioRecorderConfig = {}) {
    this.config = {
      sampleRate: config.sampleRate || 16000, // 16kHz as per backend requirements
      channels: config.channels || 1, // Mono
      bitsPerSample: config.bitsPerSample || 16, // 16-bit
      audioSource: config.audioSource || 6, // VOICE_RECOGNITION on Android
      onAudioData: config.onAudioData,
      onError: config.onError,
    };

    this.initializeAudioRecord();
  }

  /**
   * Initialize the audio recorder with configuration
   */
  private initializeAudioRecord(): void {
    const options = {
      sampleRate: this.config.sampleRate!,
      channels: this.config.channels!,
      bitsPerSample: this.config.bitsPerSample!,
      audioSource: this.config.audioSource!,
      wavFile: 'audio.wav', // temporary file name
    };

    AudioRecord.init(options);
    this.audioRecord = AudioRecord;
  }

  /**
   * Start recording audio
   */
  async startRecording(): Promise<void> {
    if (this.isRecording) {
      console.warn('[AudioRecorder] Already recording');
      return;
    }

    try {
      console.log('[AudioRecorder] Starting recording...');
      await AudioRecord.start();
      this.isRecording = true;
      console.log('[AudioRecorder] Recording started');
    } catch (error) {
      console.error('[AudioRecorder] Failed to start recording:', error);
      this.config.onError?.(error as Error);
      throw error;
    }
  }

  /**
   * Stop recording and return the audio data as base64
   */
  async stopRecording(): Promise<string | null> {
    if (!this.isRecording) {
      console.warn('[AudioRecorder] Not recording');
      return null;
    }

    try {
      console.log('[AudioRecorder] Stopping recording...');
      const audioFile = await AudioRecord.stop();
      this.isRecording = false;
      console.log('[AudioRecorder] Recording stopped, file:', audioFile);

      // Read the audio file and convert to base64
      const base64Audio = await RNFS.readFile(audioFile, 'base64');

      // Clean up the temporary file
      await RNFS.unlink(audioFile).catch(err =>
        console.warn('[AudioRecorder] Failed to delete temp file:', err),
      );

      console.log(
        '[AudioRecorder] Audio data size:',
        base64Audio.length,
        'bytes',
      );
      return base64Audio;
    } catch (error) {
      console.error('[AudioRecorder] Failed to stop recording:', error);
      this.isRecording = false;
      this.config.onError?.(error as Error);
      throw error;
    }
  }

  /**
   * Check if currently recording
   */
  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Cancel recording without returning data
   */
  async cancelRecording(): Promise<void> {
    if (!this.isRecording) {
      return;
    }

    try {
      const audioFile = await AudioRecord.stop();
      this.isRecording = false;

      // Clean up the temporary file
      await RNFS.unlink(audioFile).catch(err =>
        console.warn('[AudioRecorder] Failed to delete temp file:', err),
      );

      console.log('[AudioRecorder] Recording cancelled');
    } catch (error) {
      console.error('[AudioRecorder] Failed to cancel recording:', error);
      this.isRecording = false;
    }
  }

  /**
   * Get recording status
   */
  getRecordingStatus(): boolean {
    return this.isRecording;
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    if (this.isRecording) {
      this.cancelRecording();
    }
  }
}
