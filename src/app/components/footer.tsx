import { Film } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";

export const Footer = () => {
  return (
    <div className="bg-indigo-700 py-10 px-15">
      <div className="flex flex-col gap-5 md:flex md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 h-5 items-center">
            <Film className="h-5 w-5" />
            <button className="text-[16px] italic font-bold cursor-pointer">
              Movie Z
            </button>
          </div>
          <div className="text-[14px]">
            © {new Date().getFullYear()} Movie Z. All Rights Reserved.
          </div>
        </div>
        <div className="flex flex-wrap gap-30">
          <div className="text-[14px] flex flex-col gap-4">
            <div>Contact Information</div>
            <div className="flex gap-2 items-center">
              <Mail size={15} />
              <div className="w-20 max-w-full">Email : support@movieZ.com</div>
            </div>
            <div className="flex gap-2 items-center">
              <Phone size={15} />
              <div className="w-25 max-w-full">Phone : +976 (11) 123-4567</div>
            </div>
          </div>
          <div className="text-[14px] flex flex-col gap-4">
            <div>Follow us</div>
            <div className="font-semibold flex flex-col gap-3 lg:flex-row">
              <a href="http://">Facebook</a>
              <a href="http://">Instagram</a>
              <a href="http://">Twitter</a>
              <a href="http://">Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
