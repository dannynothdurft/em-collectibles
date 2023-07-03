/* 
  Datei: Layout.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Dieser Provider ist für das Layout der Admin Anwendung.
*/

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { LuSettings } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { incrementProducts } from "../module/article/article/reducers/allProducts";
import { incrementSettings } from "../module/settings/reducers/settings";
import { incrementOrders } from "../module/orders/reducers/allOrders";
import { Toaster } from "react-hot-toast";

function Layout({ children }) {
  const router = useRouter();
  const currentUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const pathname = usePathname();
  const isNotPrivatePage = pathname.includes("login");
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.allProducts);
  const { allSettings } = useSelector((state) => state.settings);

  const [adminInfo, setAdminInfo] = useState(null);
  const [articleOpen, setArticleOpen] = useState(false);

  const [active, setActive] = useState("dashboard");

  const handleSetActive = (linkName) => setActive(linkName);

  const getData = async () => {
    try {
      const token = localStorage.getItem("user");
      const response = await axios.post(`${currentUrl}/api/get-user-info`, {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        setAdminInfo(response.data.data);
      } else {
        localStorage.removeItem("user");
        router.push("/admin/login");
      }
    } catch (error) {
      localStorage.removeItem("user");
      router.push("/admin/login");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (adminInfo === null) {
        getData();
      }
    }, 1);
    return () => clearTimeout(timer);
  }, [adminInfo]);

  const articleOpenSwitch = () => {
    setArticleOpen(!articleOpen);
  };

  const handleLinkClick = () => {
    setArticleOpen(false);
  };

  const getArticles = async () => {
    try {
      const response = await axios.get(
        `${currentUrl}/admin/module/article/article/api/get`
      );
      dispatch(incrementProducts(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${currentUrl}/admin/module/orders/api/getorders`
      );
      dispatch(incrementOrders(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getSettings = async () => {
    try {
      const response = await axios.get(
        `${currentUrl}/admin/module/settings/api/get`
      );
      dispatch(incrementSettings(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (products.length === 0) {
        getArticles();
      }
      if (allSettings.length === 0) {
        getOrders();
      }
      if (allSettings.length === 0) {
        getSettings();
      }
    }, 1);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post(`${currentUrl}/admin/login/api/logout`);
      if (response.data.success) {
        localStorage.removeItem("user");
        window.location.href = "/admin/login";
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return adminInfo !== null ? (
    <>
      <Toaster />
      {!isNotPrivatePage ? (
        <main className="admin--main">
          <div className="admin--header">
            {adminInfo && (
              <div className="user--info" onClick={logout}>
                <p>
                  Moin <span>{adminInfo.user}</span>!
                </p>
                <p className="admin--type">Administrator</p>
              </div>
            )}
          </div>
          <div className="admin--navigation">
            {allSettings.logo && (
              <Image
                src={allSettings.logo}
                width={100}
                height={55}
                alt="logo"
              />
            )}
            <Link
              href="/admin/"
              className={active === "dashboard" ? "active" : ""}
              onClick={() => handleSetActive("dashboard")}
            >
              Dashboard
            </Link>
            <div
              className={
                active.includes("article")
                  ? "module--link--container--active"
                  : "module--link--container"
              }
            >
              <p
                className={active === "article" ? "active" : ""}
                onClick={() => handleSetActive("article")}
              >
                Artikel verwalten
              </p>
              <div
                className={
                  active === "articleAt"
                    ? "module--links active"
                    : "module--links"
                }
                onClick={() => handleSetActive("articleAt")}
              >
                <Link href="/admin/module/article/article">Artikel</Link>
              </div>
            </div>
            <Link
              href="/admin/module/orders"
              className={active === "orders" ? "active" : ""}
              onClick={() => handleSetActive("orders")}
            >
              Bestellungen
            </Link>
            <Link
              href="/admin/module/settings"
              className={
                active === "settings"
                  ? "settings--link active"
                  : "settings--link"
              }
              onClick={() => handleSetActive("settings")}
            >
              <LuSettings fill="#ffffff" size={25} /> Einstellung
            </Link>
          </div>
          <div className="admin--module">{children}</div>
        </main>
      ) : (
        isNotPrivatePage && <>{children}</>
      )}
    </>
  ) : (
    isNotPrivatePage && <>{children}</>
  );
}

export default Layout;
