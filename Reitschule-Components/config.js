// text-blocks
const meineLeidenschaft = {
       title: "Die Reitschule",
       text: "Erlebe die unvergleichliche Faszination des Reitens in einer idyllischen und naturnahen Umgebung, die Dich sofort in ihren Bann ziehen wird. Hier, inmitten der unberührten Natur, kannst Du dem Alltag entfliehen und eine tiefe Verbindung zu den majestätischen Pferden aufbauen. Meine Reitschule bietet Dir ein einzigartiges Erlebnis, bei dem Du die Schönheit und Anmut dieser edlen Tiere hautnah erleben kannst. Meine Reitschule ist mehr als nur ein Ort zum Reiten – sie ist ein Ort des Lernens, des Wachsens und des Genießens. Hier kannst Du neue Freundschaften schließen, sowohl mit Gleichgesinnten als auch mit den Pferden, und unvergessliche Momente erleben. Lass Dich von der Magie des Reitens verzaubern und entdecke eine neue Leidenschaft oder vertiefe Deine bestehende Liebe zu Pferden. Ich freue mich darauf, Dich auf diesem wunderbaren Weg zu begleiten und Dir unvergessliche Erlebnisse zu schenken."
};

const meinZiel = {
    title: "Mein Ziel",
    text: "Bei mir steht das Wohl von Mensch und Pferd im Mittelpunkt. Mein Ziel ist es, Reitern jeden Alters und Erfahrungslevels eine fundierte und einfühlsame Ausbildung zu bieten. Ich lege großen Wert auf eine harmonische Beziehung zwischen Reiter und Pferd, die auf Respekt, Vertrauen und gegenseitigem Verständnis basiert. Durch eine sorgfältige und individuelle Betreuung möchte ich die Freude am Reiten fördern und gleichzeitig Wissen über Pferdepflege, Haltung und ethisches Reiten vermitteln. Ob Du Anfänger bist oder Deine Reitfähigkeiten weiterentwickeln möchtest – ich begleite Dich auf Deinem Weg zu einem verantwortungsvollen und erfolgreichen Reiter."
};

const gruppenEinzelnterricht = {
    title: "Gruppen- und Einzelnterricht",
    text: "Ich biete maßgeschneiderten Einzelunterricht für Deine individuelle Förderung sowie dynamischen Gruppenunterricht für gemeinsames Lernen und Teamgeist an. Ob Du persönlich betreut werden oder Dich in der Gruppe weiterentwickeln möchtest, ich unterstütze Dich dabei, Deine Reitfähigkeiten zu verbessern und Deine Ziele zu erreichen. Gemeinsam schaffen wir eine Lernumgebung, in der Du Dich wohlfühlst und erfolgreich sein kannst."
};

const anmeldung = {
    title: "Anmeldung",
    text: `<ol class="list list--numbered">
    <li class="list__item">Schnupperlektion
        Zuerst kommst du zu einer Schnupperlektion und entscheidest wie es dir gefällt.
    </li>
    <li class="list__item">Einzelunterricht
        Wenn du noch nie geritten bist, empfehlen wir mit ein paar Einzellektionen zu starten, damit du dich mit dem Reiten und dem Umgang mit dem Pferd vertraut machen kannst.
    </li>
    <li class="list__item">Gruppenunterricht
        Wenn du dann soweit bist, kannst du in einer Gruppe von 4-6 Personen mitreiten.
    </li>
</ol>`
};

const voltegieren = {
    title: "Voltegieren",
    text: `Ich biete speziellen Einzelunterricht im Voltigieren an – eine faszinierende Mischung aus Gymnastik und Reiten. Im Einzelunterricht kann ich mich ganz auf Dich und Deine individuellen Fähigkeiten konzentrieren, um Deine Balance, Koordination und Körperbeherrschung zu verbessern. Schritt für Schritt leite ich Dich an, damit Du sicher und selbstbewusst die Kunst des Voltigierens erlernst. Egal, ob Du Anfänger bist oder Deine Technik verfeinern möchtest, der Einzelunterricht bietet Dir die perfekte Gelegenheit, Deine Voltigierfähigkeiten in einem sicheren und unterstützenden Umfeld weiterzuentwickeln. Ich freue mich darauf, Dich auf Deinem Weg zu begleiten!`
};

const adressen = {
    title: "Adressen",
    text: ` <p>Email:<span class="text-block__contact-tag">emilia.muster@reitschule.ch</span></p>
            <p>Telefon:<span class="text-block__contact-tag">0123456789</span></p>`
};

const lage = {
    title: "Lage",
    text: `<address class="address-block">
                Schluchewäg 1 <br>
                8197 Rafz <br>
                Schweiz
            </address>
            <section class="iframe-container">
                <iframe class="iframe-container__iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1446.2232683999107!2d8.534571866180773!3d47.619425296295596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479079cc5ed8fce3%3A0x9d1243e0b8bebad4!2sSchluchew%C3%A4g%201%2C%208197%20Rafz!5e1!3m2!1sen!2sch!4v1733920243366!5m2!1sen!2sch" width="600" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>`
};

const kontaktformular = {
    title: "Kontaktformular",
    text: `<form class="form" id="contactForm">
            <fieldset>
                <label class="form__label" for="form-input-name">Name Reitschülerin:</label>
                <input name="name" id="form-input-name" type="text" required>

                <label class="form__label" for="form-input-birthdate">Geburtsdatum:</label>
                <input name="birthdate" id="form-input-birthdate" type="date" required>

                <label class="form__label" for="form-input-email">Email:</label>
                <input name="email" id="form-input-email" type="email" required>

                <label class="form__label" for="form-input-phone">Telefonnummer:</label>
                <input name="phone" id="form-input-phone" type="tel" required>

                <label class="form__label">Reiterfahrung:</label>
                <input class="form-input-radio1" value="anfaenger" name="experience" type="radio" required>
                <label class="form__input-radio">Anf&#228;nger</label>
                <input class="form-input-radio2 form__input" name="experience" value="fortgeschritten" type="radio" required>
                <label class="form__input-radio">Fortgeschritten</label>

                <label class="form__label" for="form-input-topic">Anfrage bezüglich:</label>
                <select id="form-input-topic" name="topic" class="form-input-topic" required>
                    <option>Reitunterricht</option>
                    <option>Voltegieren</option>
                    <option>Sonstiges</option>
                </select>

                <label class="form__label" for="form-input-message">Nachricht:</label>
                <textarea id="form-input-message" name="message" class="form__textarea"
                    placeholder="z. B. Ich möchte mich für einen Schnupperkurs anmelden." cols="20"
                    rows="10"></textarea>

                <button class="button form__submit" type="submit">Abschicken</button>
                <p class="form__notice" hidden>Anfrage wurde geschickt!</p>
            </fieldset>
        </form>`
};

const vorstellung = {
    title: "Wer bin ich",
    text: "Ich bin Emilia Muster, Deine Reitlehrerin in der Reitschule Schluchebärg. Geboren und aufgewachsen auf einem Reiterhof in Zürich, habe ich meine Leidenschaft für Pferde und das Reiten schon von klein auf entwickelt. Vor 10 Jahren habe ich die Reitschule Schluchebärg gegründet, um meine Leidenschaft und mein Wissen an andere weiterzugeben. Mit über 30 Jahren Reiterfahrung und einem Bachelor in Tierwissenschaften von der Universität Zürich, bin ich bestens ausgestattet, um Dich auf Deinem Reitweg zu begleiten. Ich lege großen Wert auf eine harmonische Beziehung zwischen Mensch und Pferd, die auf Respekt, Vertrauen und gegenseitigem Verständnis basiert."
};

const reiterfahrung = {
    title: "Meine Reiterfahrung",
    text: "Meine Reiterfahrung erstreckt sich über mehrere Jahrzehnte und verschiedene Disziplinen. Als diplomierte Reitlehrerin und zertifizierte Voltigiertrainerin habe ich umfangreiche Kenntnisse und Fähigkeiten erworben. Ich habe sowohl Anfänger als auch fortgeschrittene Reiter unterrichtet und war selbst viele Jahre als Turnierreiterin in Dressur und Springreiten aktiv. Zudem habe ich als Pferdepflegerin und -trainerin in verschiedenen renommierten Reitschulen gearbeitet. Seit der Gründung der Reitschule Schluchebärg vor 10 Jahren biete ich maßgeschneiderten Einzelunterricht und dynamischen Gruppenunterricht an, um Deine Reitfähigkeiten zu verbessern und Deine Ziele zu erreichen. Ob Du Anfänger bist oder Deine Technik verfeinern möchtest, ich freue mich darauf, Dich auf Deinem Weg zu einem verantwortungsvollen und erfolgreichen Reiter zu begleiten."
};

const pferdehaltung = {
    title: "Pferdehaltung",
    text: `In meiner Reitschule steht das Wohl der Pferde an erster Stelle. Ich setze auf eine artgerechte Pferdehaltung, die den Empfehlungen des "Pferde-raus" Programms von STS (Schweizer Tierschutz) folgt. Das bedeutet, dass unsere Pferde regelmäßig Auslauf auf weitläufigen Weiden genießen und in einer Umgebung leben, die ihren natürlichen Bedürfnissen gerecht wird. Eine artgerechte Haltung fördert nicht nur das körperliche Wohlbefinden der Pferde, sondern trägt auch zu ihrem mentalen und emotionalen Gleichgewicht bei. Ich bin überzeugt, dass glückliche und gesunde Pferde die besten Partner für ein harmonisches Reiterlebnis sind.`
};

const voltegierPreise = {
    title:"Preise:",
    text:"Die Preise für den Voltigierkurs sind individuell, da sie von Deinen persönlichen Bedürfnissen und Zielen abhängen. Wenn Du Interesse an einem Voltigierkurs hast, kontaktiere mich gerne direkt. Gemeinsam finden wir den passenden Kurs und die entsprechenden Konditionen für Dich.",
    prominent:"true"
};

const gruppeEinzelPreise = {
    title:"Preise:",
    text:`  <h4>Einzelunterricht</h4>
            <h5>Kinder (6-18)</h5>
            <ul class="list">
                <li class="list__item">Einzelzahlung - 65Fr./mal</li>
                <li class="list__item">110er Abo - 600Fr. (60Fr./mal)</li>
            </ul>
            <h5>Erwachsene (ab 18. Geburtstag)</h5>
            <ul class="list">
                <li class="list__item">Einzelzahlung - 80Fr./mal</li>
                <li class="list__item">10er Abo - 750Fr. (75Fr./mal)</li>
            </ul>
            <h4>Gruppenunterricht</h4>
            <ul class="list">
                <li class="list__item">Einzelzahlung - 50Fr./mal</li>
                <li class="list__item">10er Abo - 400Fr. (40Fr./mal)</li>
            </ul>`,
    prominent:"true"
};

// horse cards
const horse1 = {
    name:"Rosi",
    breed:"Haflinger",
    birthyear:"2006",
    color:"Fuchs",
    gender:"Stute",
    photosrc:"./img/Rosi.jpg",
    alt:"Foto einer Haflinger Stute."
};

const horse2 = {
    name:"Allegra",
    breed:"Haflinger",
    birthyear:"2011",
    color:"Fuchs",
    gender:"Stute",
    photosrc:"./img/Allegra.jpg",
    alt:"Foto einer Haflinger Stute."
};

const horse3 = {
    name:"Maik du Milan",
    breed:"Haflinger",
    birthyear:"2009",
    color:"Fuchs",
    gender:"Wallach",
    photosrc:"./img/MaikDuMilan.jpg",
    alt:"Foto eines Haflinger Wallachs."
};

const horse4 = {
    name:"Marrakesch vom Schluchebärg",
    breed:"Haflinger",
    birthyear:"2017",
    color:"Fuchs",
    gender:"Wallach",
    photosrc:"./img/Marrakesch.jpg",
    alt:"Foto eines Haflinger Wallachs."
};

const horse5 = {
    name:"Halliena-Sue",
    breed:"Haflinger",
    birthyear:"2012",
    color:"Fuchs",
    gender:"Stute",
    photosrc:"./img/Halliena-Sue.jpg",
    alt:"Foto einer Haflinger Stute."
};

const horse6 = {
    name:"Leandro",
    breed:"Freiberger",
    birthyear:"2010",
    color:"Braun",
    gender:"Wallach",
    photosrc:"./img/Leandro.jpg",
    alt:"Foto eines Freiberger Wallachs."
};

module.exports = { meineLeidenschaft, meinZiel, gruppenEinzelnterricht, anmeldung, voltegieren, adressen, lage, kontaktformular, vorstellung, reiterfahrung, pferdehaltung,voltegierPreise, gruppeEinzelPreise, horse1, horse2, horse3, horse4, horse5, horse6};

