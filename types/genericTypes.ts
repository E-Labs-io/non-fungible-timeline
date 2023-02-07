/** @format */

export interface ExtraStyleProps {
  width?: string;
  height?: string;
  padding?: string;
  fontSize?: string;
  backgroundColor?: string;
  borderRadius?: string;
  disabled?: boolean;
  type?: string;
  minHeight?: string;
  fontWeight?: string;
  textAlign?: string;
  hiddenBorder?: boolean;
  signedIn?: boolean;
  onChange?: any;
  onFocus?: any;
  open?: boolean;
  showSmallMenu?: boolean;
}

export class ApiError {
  readonly status: number;
  readonly message: string;
  constructor(errorStatus: number, errorMessage: string) {
    this.status = errorStatus;
    this.message = errorMessage;
  }
}
