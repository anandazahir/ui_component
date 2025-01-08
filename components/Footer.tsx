import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pad-x flex w-full flex-col items-center justify-center gap-y-4 py-6">
      <p className="max-w-sm text-center text-xs text-muted-foreground md:text-sm">
        <code>Made with ❤️ by</code>{" "}
        <Link
          href="https://github.com/ananda.zahir"
          target="_blank"
          className="font-medium text-foreground"
        >
          anandazahir
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
