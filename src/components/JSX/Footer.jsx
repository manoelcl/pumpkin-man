const Footer = () => {
  return (
    <footer className="container absolute bottom-0 p-1 text-left text-2xl text-orange-700   ">
      Manoel Castro, 2022. Follow me at:{" "}
      <a
        className=" text-orange-500 hover:text-orange-200"
        href="https://www.linkedin.com/in/manoelcl/"
      >
        LinkedIn
      </a>{" "}
      |{" "}
      <a
        className=" text-orange-500 hover:text-orange-200"
        href="https://twitter.com/spell_castro"
      >
        Twitter
      </a>{" "}
      |{" "}
      <a
        className=" text-orange-500 hover:text-orange-200"
        href="https://github.com/manoelcl"
      >
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
