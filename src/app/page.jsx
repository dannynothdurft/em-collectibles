/* 
  Datei: page.jsx
  Version: 1.0.0
  Entwickler: Danny Nothdurft
  Beschreibung: Diese Seite ist die Startseite der Shop-Anwendung.
*/

"use client";
import "@/styles/home.scss";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { useSelector } from "react-redux";

export default function Home() {
  const { allArticles } = useSelector((state) => state.articles);

  return (
    <main className="main--container--page">
      <div>
        <Image
          src="https://res.cloudinary.com/dca67w0ia/image/upload/v1688492005/head_xzcnia.webp"
          width={1100}
          height={385}
          style={{ height: "auto" }}
          className="header--image"
          alt="Header"
          priority
        />
      </div>

      <div className="grading--company--container">
        <div className="grading--company--card">
          <Image
            src="/psa.png"
            width={215}
            height={122}
            className="grading--image"
            alt="PSA"
          />
        </div>
        <div className="grading--company--card">
          <Image
            src="/gsg.webp"
            width={215}
            height={122}
            className="grading--image"
            alt="GSG"
          />
        </div>
        <div className="grading--company--card">
          <Image
            src="/ap.png"
            width={215}
            height={122}
            className="grading--image"
            alt="AP"
          />
        </div>
        <div className="grading--company--card">
          <Image
            src="/bg.jpg"
            width={215}
            height={122}
            className="grading--image"
            alt="Beckett"
          />
        </div>
      </div>

      <div className="new--at--shop">
        <h2 className="headline">Neu im Shop</h2>

        {/*
          In dieser Map wird zuerst das Array Kopiert.
          Dann wird es mit reverse umgedreht um die neusten ganz vorne zu haben.
          Mit Slice wird das Array auf 8 Producte Reduziert und ausgegeben.
        */}
        <div className="new--at--shop--product--cards">
          {allArticles ? "Ja" : "Nein"}
          {/* {[...allArticles]
            .reverse()
            .slice(0, 8)
            .map((card) => {
              return <ProductCard key={card._id} data={card} />;
            })} */}
        </div>

        <Link className="button" href="/shop">
          Alle Anzeigen
        </Link>
      </div>

      <div className="home--shippinginfo--container">
        <div className="home--shippinginfo--content">
          <h2>Kostenloser Versand mit DHL</h2>
          <p>
            Wir freuen uns, dir mitteilen zu können, dass wir deine Bestellung
            kostenlos und sorgfältig verpackt mit DHL versenden.
          </p>
          <p>
            Unser Ziel ist es, dir ein angenehmes Einkaufserlebnis zu bieten.
            Sollte dir eine Karte aus unserer Auswahl einmal nicht gefallen,
            kannst du sie ganz einfach an uns zurücksenden.
          </p>
          <p>
            Wir verstehen, wie wichtig es ist, dass du mit deinem Kauf zufrieden
            bist. Daher stehen wir dir gerne zur Seite, falls du Fragen oder
            Anliegen hast.
          </p>
          <p>
            Genieße den Komfort des kostenlosen Versands und freue dich darauf,
            deine Bestellung zeitnah und in einwandfreiem Zustand zu erhalten.
          </p>
        </div>
        <div className="home--shippinginfo--image">
          <Image
            src="/logo512.png"
            width={250}
            height={250}
            alt="Versand Bild"
          />
        </div>
      </div>
    </main>
  );
}
