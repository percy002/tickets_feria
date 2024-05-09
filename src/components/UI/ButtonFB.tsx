import { Button } from "flowbite-react";

interface Props {
  text: string;
}
const ButtonFB = ({ text }: Props) => {
  return (
    <Button
      type="submit"
      className="bg-primary rounded-3xl enabled:hover:bg-primary w-full"
      size={"xl"}
    >
      <span className="font-bold text-xl">{text}</span>
    </Button>
  );
};
export default ButtonFB;
