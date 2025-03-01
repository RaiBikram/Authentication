import React from "react";
import { Separator } from "../ui/separator";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div>
      <Separator />

      <div className="flex justify-center items-center text-center">
        {" "}
        Footer
      </div>
    </div>
  );
};

export default Footer;
