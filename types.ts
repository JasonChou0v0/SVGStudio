export interface SvgSettings {
  text: string;
  fontSize: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  fontFamily: string;
  backgroundColor: string;
  rotation: number;
  shadow: boolean;
}

export enum GenerationMode {
  STANDARD = 'STANDARD',
  AI_ARTISTIC = 'AI_ARTISTIC',
}

export interface GeneratedSvgData {
  code: string;
  isAiGenerated: boolean;
}