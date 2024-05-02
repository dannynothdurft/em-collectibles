/* 
  Datei: LayoutProvider.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieser Provider enthält das Layout der Shop-Anwendung.
*/

"use client";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer/Footer";
import "@/styles/navigation.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { incrementSettings } from "@/redux/reducer/settings";
import { incrementArticles } from "@/redux/reducer/articles";

function LayoutProvider({ children }) {
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const dispatch = useDispatch();
  const { allSettings } = useSelector((state) => state.settings);
  const { allArticles } = useSelector((state) => state.articles);
  const pathname = usePathname();
  const isNotPrivatePage = pathname.includes("/admin"); //||pathname === "/lager";

  const getStartData = async () => {
    try {
      const response = await axios.post(`${currentUrl}/api/start`);
      if (response.data.success) {
        dispatch(incrementArticles(response.data.data.activeArticles));
        dispatch(incrementSettings(response.data.data.shopSettings));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (allArticles === undefined && !isNotPrivatePage) {
        getStartData();
      }
    }, 1);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isNotPrivatePage ? (
        <>
          <Toaster />
          <div className="navigation--container">
            <div className="navigation--wrapper">
              <Link href="/">
                <Image
                  src={allSettings.logo}
                  width={75}
                  height={75}
                  alt="Logo"
                />
              </Link>

              <div className="navigation--menu">
                <Link
                  href="/shop"
                  className={pathname === "/shop" ? "active" : ""}
                >
                  Shop
                </Link>
                <Link
                  href="/warenkorb"
                  className={pathname === "/warenkorb" ? "active" : ""}
                >
                  Warenkorb
                </Link>
              </div>
            </div>
          </div>

          <div className="main--container">{children}</div>

          <Footer />
        </>
      ) : (
        isNotPrivatePage && <>{children}</>
      )}
    </>
  );
}

export default LayoutProvider;
