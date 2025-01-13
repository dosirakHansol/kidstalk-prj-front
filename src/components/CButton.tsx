import { Button } from "antd";
import {
  FC,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";

export type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonProps = ReactButtonProps & {};

export const CButton: FC<PropsWithChildren<ButtonProps>> = ({ ...props }) => {
  return <Button type="primary">{props.value}</Button>;
};
