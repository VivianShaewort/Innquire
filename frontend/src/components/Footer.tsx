const Footer = () => {
    return (
        <div style={{backgroundColor:"#1a3e2b"}} className="py-10 px-10">
            <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl text-white font-bold font-headers tracking-tight">
          Innquire
        </span>
        <span className="text-white font-bold font-body tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
            </div>
        </div>
    );
};

export default Footer;