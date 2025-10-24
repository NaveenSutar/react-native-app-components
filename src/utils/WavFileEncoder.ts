/**
 * Utility to create WAV file from raw PCM audio data
 * Based on the backend spec: PCM signed 16-bit, mono, little-endian, 16kHz
 */

export interface WavConfig {
  sampleRate?: number;
  numChannels?: number;
  bitsPerSample?: number;
}

export class WavFileEncoder {
  private sampleRate: number;
  private numChannels: number;
  private bitsPerSample: number;

  constructor(config: WavConfig = {}) {
    this.sampleRate = config.sampleRate || 16000; // 16kHz as per backend spec
    this.numChannels = config.numChannels || 1; // Mono
    this.bitsPerSample = config.bitsPerSample || 16; // 16-bit
  }

  /**
   * Convert base64 PCM audio to base64 WAV audio with proper headers
   */
  pcmToWav(pcmBase64: string): string {
    try {
      // Decode base64 to get raw PCM bytes using native methods
      const pcmBinary = this.base64Decode(pcmBase64);
      const pcmLength = pcmBinary.length;

      // Calculate sizes
      const byteRate =
        (this.sampleRate * this.numChannels * this.bitsPerSample) / 8;
      const blockAlign = (this.numChannels * this.bitsPerSample) / 8;
      const dataSize = pcmLength;
      const fileSize = 44 + dataSize; // 44 bytes for WAV header

      // Create WAV file as binary string
      let wavBinary = '';

      // Write WAV header
      wavBinary += this.stringToBytes('RIFF'); // ChunkID
      wavBinary += this.uint32ToBytes(fileSize - 8, true); // ChunkSize
      wavBinary += this.stringToBytes('WAVE'); // Format
      wavBinary += this.stringToBytes('fmt '); // Subchunk1ID
      wavBinary += this.uint32ToBytes(16, true); // Subchunk1Size (16 for PCM)
      wavBinary += this.uint16ToBytes(1, true); // AudioFormat (1 for PCM)
      wavBinary += this.uint16ToBytes(this.numChannels, true); // NumChannels
      wavBinary += this.uint32ToBytes(this.sampleRate, true); // SampleRate
      wavBinary += this.uint32ToBytes(byteRate, true); // ByteRate
      wavBinary += this.uint16ToBytes(blockAlign, true); // BlockAlign
      wavBinary += this.uint16ToBytes(this.bitsPerSample, true); // BitsPerSample
      wavBinary += this.stringToBytes('data'); // Subchunk2ID
      wavBinary += this.uint32ToBytes(dataSize, true); // Subchunk2Size

      // Append PCM data
      wavBinary += pcmBinary;

      // Convert to base64
      return this.base64Encode(wavBinary);
    } catch (error) {
      console.error('[WavFileEncoder] Error encoding WAV:', error);
      throw error;
    }
  }

  /**
   * Convert string to bytes
   */
  private stringToBytes(str: string): string {
    return str;
  }

  /**
   * Convert uint32 to bytes (little-endian)
   */
  private uint32ToBytes(value: number, littleEndian: boolean): string {
    const bytes = new Array(4);
    if (littleEndian) {
      bytes[0] = value & 0xff;
      bytes[1] = (value >> 8) & 0xff;
      bytes[2] = (value >> 16) & 0xff;
      bytes[3] = (value >> 24) & 0xff;
    } else {
      bytes[3] = value & 0xff;
      bytes[2] = (value >> 8) & 0xff;
      bytes[1] = (value >> 16) & 0xff;
      bytes[0] = (value >> 24) & 0xff;
    }
    return String.fromCharCode(...bytes);
  }

  /**
   * Convert uint16 to bytes (little-endian)
   */
  private uint16ToBytes(value: number, littleEndian: boolean): string {
    const bytes = new Array(2);
    if (littleEndian) {
      bytes[0] = value & 0xff;
      bytes[1] = (value >> 8) & 0xff;
    } else {
      bytes[1] = value & 0xff;
      bytes[0] = (value >> 8) & 0xff;
    }
    return String.fromCharCode(...bytes);
  }

  /**
   * Decode base64 to binary string
   */
  private base64Decode(base64: string): string {
    // Polyfill for atob
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = '';
    let i = 0;

    base64 = base64.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    while (i < base64.length) {
      const enc1 = chars.indexOf(base64.charAt(i++));
      const enc2 = chars.indexOf(base64.charAt(i++));
      const enc3 = chars.indexOf(base64.charAt(i++));
      const enc4 = chars.indexOf(base64.charAt(i++));

      const chr1 = (enc1 << 2) | (enc2 >> 4);
      const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      const chr3 = ((enc3 & 3) << 6) | enc4;

      str += String.fromCharCode(chr1);

      if (enc3 !== 64) {
        str += String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        str += String.fromCharCode(chr3);
      }
    }

    return str;
  }

  /**
   * Encode binary string to base64
   */
  private base64Encode(str: string): string {
    // Polyfill for btoa
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    let i = 0;

    while (i < str.length) {
      const chr1 = str.charCodeAt(i++);
      const chr2 = i < str.length ? str.charCodeAt(i++) : NaN;
      const chr3 = i < str.length ? str.charCodeAt(i++) : NaN;

      const enc1 = chr1 >> 2;
      let enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      let enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = 64;
        enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output +=
        chars.charAt(enc1) +
        chars.charAt(enc2) +
        chars.charAt(enc3) +
        chars.charAt(enc4);
    }

    return output;
  }
}
