import { FiAward, FiHome, FiMapPin, FiUsers } from "react-icons/fi";
import { TbBuildingStore } from "react-icons/tb";
import foto from "../assets/family-moving-using-boxes 1.svg";
import sold_house from "/icons/housesold.svg";
import Homeikon from "/icons/home.svg";
import "../Styles/homecomp.css";

export default function HomeComp({ imageSrc = foto }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="relative lg:col-span-5">
          <div className="home-visual">
            <span className="home-visual__frame" aria-hidden="true" />
            <img
              src={imageSrc}
              alt="Familie i hjemmet"
              className="home-visual__img"
            />
            <div className="home-visual__badge">
              <div className="home-visual__badge-num">38+</div>
              <div className="home-visual__badge-text">
                års mægler-
                <br />
                erfaring
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <h2 className="text-slate-900 font-bold text-3xl md:text-4xl leading-tight">
            Vi har fulgt danskerne hjem
            <br />i snart 4 årtier
          </h2>

          <p className="mt-6 font-semibold text-slate-900">
            Det synes vi siger noget om os!
          </p>

          <p className="mt-3 text-slate-600">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has normal distribution.
          </p>
          <p className="mt-3 text-slate-600">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-md bg-blue-50 p-3 text-blue-600">
                <img src={sold_house} alt="" className="size-11" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">4829</div>
                <div className="text-slate-600 -mt-1">boliger solgt</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-md bg-blue-50 p-3 text-blue-600">
                <img src={Homeikon} alt="" className="size-11" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">158</div>
                <div className="text-slate-600 -mt-1">boliger til salg</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12 border-t border-slate-200" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Feature
          icon={<FiAward className="size-6" />}
          title="Bestil et salgstjek"
          text="Med et Din Mægler Salgstjek bliver du opdateret på værdien af din bolig."
        />
        <Feature
          icon={<TbBuildingStore className="size-6" />}
          title="74 butikker"
          text="Hos Din Mægler er din bolig til salg i alle vores 74 butikker, som er fordelt rundt om i Danmark."
        />
        <Feature
          icon={<FiMapPin className="size-6" />}
          title="Tilmeld køberkartotek"
          text="Når du er tilmeldt vores køberkartotek, bliver du kontaktet inden en ny bolig bliver annonceret."
        />
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 rounded-md bg-blue-50 p-3 text-[#162A41]">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{text}</p>
      </div>
    </div>
  );
}
