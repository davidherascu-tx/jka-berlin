import type { Metadata } from "next";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der JKA Berlin e.V.",
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-black text-zinc-900 mt-12 mb-4 flex items-center gap-3">
      <span className="h-[2px] w-8 bg-red-600 shrink-0" />
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-zinc-900 mt-6 mb-2">{children}</h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-zinc-600 leading-relaxed mb-4">{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-zinc-600 leading-relaxed">
      <span className="text-red-600 mt-1 shrink-0">–</span>
      <span>{children}</span>
    </li>
  );
}

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutz­erklärung"
        image="/tori.jpg"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">

          {/* ── 1 ── */}
          <H2>1. Datenschutz auf einen Blick</H2>

          <H3>Allgemeine Hinweise</H3>
          <P>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.
            Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
            werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
            unserer unter diesem Text aufgeführten Datenschutzerklärung.
          </P>

          <H3>Datenerfassung auf unserer Website</H3>
          <H3>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</H3>
          <P>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
            Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </P>

          <H3>Wie erfassen wir Ihre Daten?</H3>
          <P>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
            Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular
            eingeben.
          </P>
          <P>
            Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme
            erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser,
            Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten
            erfolgt automatisch, sobald Sie unsere Website betreten.
          </P>

          <H3>Wofür nutzen wir Ihre Daten?</H3>
          <P>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website
            zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens
            verwendet werden.
          </P>

          <H3>Welche Rechte haben Sie bezüglich Ihrer Daten?</H3>
          <P>
            Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger
            und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
            außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu
            verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
            jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren
            steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          </P>
          <P>
            Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der
            Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Details hierzu
            entnehmen Sie der Datenschutzerklärung unter „Recht auf Einschränkung der
            Verarbeitung".
          </P>

          <H3>Analyse-Tools und Tools von Drittanbietern</H3>
          <P>
            Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet
            werden. Das geschieht vor allem mit Cookies und mit sogenannten
            Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel
            anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden.
          </P>
          <P>
            Sie können dieser Analyse widersprechen oder sie durch die Nichtbenutzung
            bestimmter Tools verhindern. Detaillierte Informationen zu diesen Tools und über
            Ihre Widerspruchsmöglichkeiten finden Sie in der folgenden
            Datenschutzerklärung.
          </P>

          {/* ── 2 ── */}
          <H2>2. Allgemeine Hinweise und Pflichtinformationen</H2>

          <H3>Datenschutz</H3>
          <P>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr
            ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend
            der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </P>
          <P>
            Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten
            erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich
            identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert,
            welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und
            zu welchem Zweck das geschieht.
          </P>
          <P>
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der
            Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser
            Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
          </P>

          <H3>Hinweis zur verantwortlichen Stelle</H3>
          <P>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</P>
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 mb-4 text-zinc-700 space-y-1">
            <p className="font-bold text-zinc-900">JKA Berlin e.V.</p>
            <p>Neue Schönholzer Straße 32</p>
            <p>13187 Berlin-Pankow</p>
            <p className="pt-2">
              Telefon:{" "}
              <a href="tel:+493048638161" className="hover:text-red-600 transition-colors">
                (030) 48 63 81 61
              </a>
            </p>
            <p>
              E-Mail:{" "}
              <a href="mailto:honbu@jka-berlin.de" className="hover:text-red-600 transition-colors">
                honbu@jka-berlin.de
              </a>
            </p>
          </div>
          <P>
            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein
            oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
            personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
          </P>

          <H3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</H3>
          <P>
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
            möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
            Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der
            bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </P>

          <H3>
            Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen
            Direktwerbung (Art. 21 DSGVO)
          </H3>
          <P>
            Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO
            erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer
            besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen
            Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen
            gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung
            beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch
            einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr
            verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die
            Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen
            oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von
            Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
          </P>
          <P>
            Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben,
            so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie
            betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen;
            dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in
            Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten
            anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach
            Art. 21 Abs. 2 DSGVO).
          </P>

          <H3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</H3>
          <P>
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
            Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat
            ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des
            mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger
            verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
          </P>

          <H3>Recht auf Datenübertragbarkeit</H3>
          <P>
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
            Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten
            in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie
            die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen,
            erfolgt dies nur, soweit es technisch machbar ist.
          </P>

          <H3>SSL- bzw. TLS-Verschlüsselung</H3>
          <P>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
            vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an
            uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine
            verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
            von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer
            Browserzeile.
          </P>
          <P>
            Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie
            an uns übermitteln, nicht von Dritten mitgelesen werden.
          </P>

          <H3>Auskunft, Sperrung, Löschung und Berichtigung</H3>
          <P>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht
            auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten,
            deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein
            Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu
            weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter
            der im Impressum angegebenen Adresse an uns wenden.
          </P>

          <H3>Recht auf Einschränkung der Verarbeitung</H3>
          <P>
            Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der
            im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der
            Verarbeitung besteht in folgenden Fällen:
          </P>
          <ul className="mb-4 space-y-3">
            <Li>
              Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten
              bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die
              Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung
              Ihrer personenbezogenen Daten zu verlangen.
            </Li>
            <Li>
              Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig
              geschah/geschieht, können Sie statt der Löschung die Einschränkung der
              Datenverarbeitung verlangen.
            </Li>
            <Li>
              Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur
              Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen,
              haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung
              Ihrer personenbezogenen Daten zu verlangen.
            </Li>
            <Li>
              Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss
              eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange
              noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </Li>
          </ul>
          <P>
            Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben,
            dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung
            oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder
            zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus
            Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines
            Mitgliedstaats verarbeitet werden.
          </P>

          {/* ── 3 ── */}
          <H2>3. Datenerfassung auf unserer Website</H2>

          <H3>Cookies</H3>
          <P>
            Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf
            Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu,
            unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind
            kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser
            speichert.
          </P>
          <P>
            Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies".
            Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben
            auf Ihrem Endgerät gespeichert bis Sie diese löschen. Diese Cookies ermöglichen
            es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
          </P>
          <P>
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
            informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies
            für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der
            Cookies beim Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies
            kann die Funktionalität dieser Website eingeschränkt sein.
          </P>
          <P>
            Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur
            Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B.
            Warenkorbfunktion) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes Interesse an
            der Speicherung von Cookies zur technisch fehlerfreien und optimierten
            Bereitstellung seiner Dienste. Soweit andere Cookies (z. B. Cookies zur Analyse
            Ihres Surfverhaltens) gespeichert werden, werden diese in dieser
            Datenschutzerklärung gesondert behandelt.
          </P>

          <H3>Kontaktformular</H3>
          <P>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
            aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten
            zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns
            gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </P>
          <P>
            Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit
            ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
            Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose
            Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
            Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
          </P>
          <P>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie
            uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder
            der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener
            Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere
            Aufbewahrungsfristen – bleiben unberührt.
          </P>

          <H3>Anfrage per E-Mail, Telefon oder Telefax</H3>
          <P>
            Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage
            inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum
            Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese
            Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </P>
          <P>
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
            DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder
            zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen
            Fällen beruht die Verarbeitung auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
            DSGVO) und/oder auf unseren berechtigten Interessen (Art. 6 Abs. 1 lit. f
            DSGVO), da wir ein berechtigtes Interesse an der effektiven Bearbeitung der an
            uns gerichteten Anfragen haben.
          </P>
          <P>
            Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns,
            bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen
            oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener
            Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere
            gesetzliche Aufbewahrungsfristen – bleiben unberührt.
          </P>

          {/* ── 4 ── */}
          <H2>4. Plugins und Tools</H2>

          <H3>YouTube mit erweitertem Datenschutz</H3>
          <P>
            Unsere Website nutzt Plugins der Website YouTube. Betreiber der Seiten ist die
            Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
          </P>
          <P>
            Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt laut
            YouTube, dass YouTube keine Informationen über die Besucher auf dieser Website
            speichert, bevor diese sich das Video ansehen. Die Weitergabe von Daten an
            YouTube-Partner wird durch den erweiterten Datenschutzmodus hingegen nicht
            zwingend ausgeschlossen. So stellt YouTube – unabhängig davon, ob Sie sich ein
            Video ansehen – eine Verbindung zum Google DoubleClick-Netzwerk her.
          </P>
          <P>
            Sobald Sie ein YouTube-Video auf unserer Website starten, wird eine Verbindung zu
            den Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt,
            welche unserer Seiten Sie besucht haben. Wenn Sie in Ihrem YouTube-Account
            eingeloggt sind, ermöglichen Sie YouTube, Ihr Surfverhalten direkt Ihrem
            persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus
            Ihrem YouTube-Account ausloggen.
          </P>
          <P>
            Des Weiteren kann YouTube nach Starten eines Videos verschiedene Cookies auf
            Ihrem Endgerät speichern. Mit Hilfe dieser Cookies kann YouTube Informationen
            über Besucher unserer Website erhalten. Diese Informationen werden u. a.
            verwendet, um Videostatistiken zu erfassen, die Anwenderfreundlichkeit zu
            verbessern und Betrugsversuchen vorzubeugen. Die Cookies verbleiben auf Ihrem
            Endgerät, bis Sie sie löschen.
          </P>
          <P>
            Gegebenenfalls können nach dem Start eines YouTube-Videos weitere
            Datenverarbeitungsvorgänge ausgelöst werden, auf die wir keinen Einfluss haben.
          </P>
          <P>
            Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung
            unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von
            Art. 6 Abs. 1 lit. f DSGVO dar.
          </P>
          <P>
            Weitere Informationen über Datenschutz bei YouTube finden Sie in deren
            Datenschutzerklärung unter:{" "}
            <a
              href="https://policies.google.com/privacy?hl=de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 transition-colors break-all"
            >
              https://policies.google.com/privacy?hl=de
            </a>
            .
          </P>

          <H3>Google reCAPTCHA</H3>
          <P>
            Wir nutzen „Google reCAPTCHA" (im Folgenden „reCAPTCHA") auf unseren Websites.
            Anbieter ist die Google Ireland Limited („Google"), Gordon House, Barrow Street,
            Dublin 4, Irland.
          </P>
          <P>
            Mit reCAPTCHA soll überprüft werden, ob die Dateneingabe auf unseren Websites
            (z. B. in einem Kontaktformular) durch einen Menschen oder durch ein
            automatisiertes Programm erfolgt. Hierzu analysiert reCAPTCHA das Verhalten des
            Websitebesuchers anhand verschiedener Merkmale. Diese Analyse beginnt
            automatisch, sobald der Websitebesucher die Website betritt. Zur Analyse wertet
            reCAPTCHA verschiedene Informationen aus (z. B. IP-Adresse, Verweildauer des
            Websitebesuchers auf der Website oder vom Nutzer getätigte Mausbewegungen). Die
            bei der Analyse erfassten Daten werden an Google weitergeleitet.
          </P>
          <P>
            Die reCAPTCHA-Analysen laufen vollständig im Hintergrund. Websitebesucher werden
            nicht darauf hingewiesen, dass eine Analyse stattfindet.
          </P>
          <P>
            Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
            Websitebetreiber hat ein berechtigtes Interesse daran, seine Webangebote vor
            missbräuchlicher automatisierter Ausspähung und vor SPAM zu schützen.
          </P>
          <P>
            Weitere Informationen zu Google reCAPTCHA sowie die Datenschutzerklärung von
            Google entnehmen Sie folgenden Links:{" "}
            <a
              href="https://policies.google.com/privacy?hl=de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 transition-colors break-all"
            >
              https://policies.google.com/privacy?hl=de
            </a>{" "}
            und{" "}
            <a
              href="https://www.google.com/recaptcha/intro/android.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 transition-colors break-all"
            >
              https://www.google.com/recaptcha/intro/android.html
            </a>
            .
          </P>

          {/* Source */}
          <div className="mt-12 pt-8 border-t border-zinc-200">
            <p className="text-sm text-zinc-400">
              Quelle:{" "}
              <a
                href="https://www.e-recht24.de"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-600 transition-colors"
              >
                e-recht24.de
              </a>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
