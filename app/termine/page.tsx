import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import DojoKunSidebar from "../components/DojoKunSidebar";
import TermineView from "../components/TermineView";
import type { TerminEvent } from "../components/TermineView";

export const metadata: Metadata = {
  title: "Termine",
  description:
    "Termine, Turniere und Veranstaltungen der JKA Berlin im Überblick.",
};

const events: TerminEvent[] = [
  {
    title: "Summer Camp",
    startDate: "2026-06-06",
    startTime: "10:00",
    endTime: "15:00",
    type: "Lehrgang",
    organizer: "Nintaikan",
    organizerUrl: "https://www.nintaikan.de/",
    location: "Handewitt",
    address: "Alter Kirchenweg 38, 24983 Handewitt",
    image: null,
  },
  {
    title: "Kampfrichterausbildung",
    startDate: "2026-06-26",
    startTime: "18:00",
    endTime: "20:00",
    type: "Ausbildung",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Honbu Dojo Leidenkan",
    image: null,
  },
  {
    title: "Brandenburger Sommerlager",
    startDate: "2026-06-27",
    endDate: "2026-06-28",
    startTime: "10:00",
    endTime: "11:30",
    type: "Lehrgang",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Basdorf",
    address: "16348 Basdorf",
    image: "/2026_JKA_brandenburger_sommerlager_2026.jpg",
  },
  {
    title: "Kyu-Prüfungen",
    startDate: "2026-06-28",
    startTime: "11:45",
    endTime: "15:00",
    type: "Lehrgang",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Basdorf",
    address: "16348 Basdorf",
    image: null,
  },
  {
    title: "Autumn Camp mit Imura Sensei und Shiina Sensei",
    startDate: "2026-09-18",
    endDate: "2026-09-20",
    startTime: "19:00",
    endTime: "11:30",
    type: "Lehrgang",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Berlin-Buch",
    address: "Ernst-Busch-Straße 27, 13125 Berlin",
    image: "/2026_JKA_Autumn_Camp.png",
  },
  {
    title: "Dan- und Lizenzprüfungen",
    startDate: "2026-09-20",
    startTime: "13:30",
    endTime: "16:30",
    type: "Lehrgang",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Honbu Dojo Leidenkan",
    image: "/2026_Dan_Lizenzprüfungen.jpg",
  },
  {
    title: "Lubusz Cup",
    startDate: "2026-10-10",
    type: "Turnier",
    organizer: "Karate Kontra Zary",
    organizerUrl: "https://karatekontra.pl/",
    location: "Zary / Polen",
    image: "/2026_Lubusz_Cup.jpg",
  },
  {
    title: "Autumn Camp mit Ohta Sensei",
    startDate: "2026-11-14",
    startTime: "10:00",
    endTime: "17:00",
    type: "Lehrgang",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Berlin-Pankow",
    address: "Brixener Ecke Dolomitenstraße, 13187 Berlin",
    image: "/2026_Autumn_Camp_Nov.jpg",
  },
  {
    title: "Kampfrichterausbildung",
    startDate: "2026-12-04",
    startTime: "18:00",
    endTime: "20:00",
    type: "Ausbildung",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Honbu Dojo Leidenkan",
    image: null,
  },
  {
    title: "Nikolauscup",
    startDate: "2026-12-05",
    type: "Turnier",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Berlin-Buch",
    address: "Ernst-Busch-Straße 27, 13125 Berlin",
    image: "/2026_Nikolauscup.jpg",
  },
  {
    title: "Dezemberlehrgang",
    startDate: "2026-12-06",
    startTime: "10:00",
    endTime: "13:00",
    type: "Lehrgang",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Berlin-Buch",
    address: "Ernst-Busch-Straße 27, 13125 Berlin",
    image: "/2026_Dezemberlehrgang.jpg",
  },
  {
    title: "Kyuprüfungen",
    startDate: "2026-12-06",
    startTime: "13:00",
    endTime: "16:00",
    type: "Lehrgang",
    organizer: "JKA Berlin",
    organizerUrl: "https://www.jka-berlin.de/",
    location: "Berlin-Buch",
    address: "Ernst-Busch-Straße 27, 13125 Berlin",
    image: "/2026_Kyuprüfungen.jpg",
  },
];

export default function TerminePage() {
  return (
    <>
      <PageHero
        eyebrow="Kalender"
        title="Termine"
        subtitle="Turniere, Lehrgänge und Veranstaltungen auf einen Blick."
        image="/slider_7.jpg"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
            <div className="flex-1 min-w-0">
              <TermineView events={events} />
            </div>
            <div className="hidden lg:block w-72 shrink-0">
              <DojoKunSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
