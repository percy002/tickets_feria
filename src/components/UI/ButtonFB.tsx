import { Button } from "flowbite-react";

interface Props {
  text: string;
  isSubmit?: boolean;
  className?: string;
}
const ButtonFB = ({ text, isSubmit, className }: Props) => {
  return (
    <Button
      type={isSubmit ? "submit" : "button"}
      className={`bg-primary rounded-3xl enabled:hover:bg-primary w-full ${className}`}
      size={"xl"}
    >
      <span className="font-bold text-xl">{text}</span>
    </Button>
  );
};
export default ButtonFB;
