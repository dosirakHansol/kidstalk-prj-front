export interface RegisterProps {
  userId?: string;
  name?: string;
  password?: string;
  location?: string;
  isLoading: boolean;
  onFinish?: (values: any) => void;
  onFinishFailed?: (valuse: any) => void;
}

export interface IBasicUser {
  userId: string;
  name: string;
  password?: string;
  location?: string;
}

export interface IUserLogin {
  userId: string;
  password: string;
}
