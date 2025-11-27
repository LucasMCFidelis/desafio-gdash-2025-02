import { Github, Linkedin } from "lucide-react";
import { memo } from "react";

import { buttonVariants } from "../ui/button";

const Footer = () => {
  return (
    <footer className="flex items-center gap-4 py-4 px-6 bg-card border-t-2 shadow-md rounded-l-2xl rounded-r-2xl">
      <p className="font-semibold ">
        Desenvolvido por:{" "}
        <a
          target="_blank"
          href="mailto:lucasm241301@gmail.com"
          id="redirect-to-email"
          className="lowercase text-primary cursor-pointer underline-offset-3 hover:underline"
        >
          lucasm241301@gmail.com
        </a>
      </p>
      <a
        id="redirect-to-github"
        href={"https://github.com/LucasMCFidelis"}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({
          variant: "secondary",
          size: "icon",
        })}
      >
        <Github />
      </a>
      <a
        id="redirect-to-linkedin"
        href={"https://www.linkedin.com/in/lucas-fidelis-778705149/"}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({
          variant: "secondary",
          size: "icon",
        })}
      >
        <Linkedin />
      </a>
    </footer>
  );
};

export default memo(Footer);
