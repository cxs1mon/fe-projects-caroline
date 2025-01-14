class RTSForm extends HTMLElement {

    connectedCallback() {
        this.innerHTML =
        `
            <h3 class="text-block__subtitle">Kontaktformular</h3>
            <form class="form d-flex justify-content-between" id="contactForm">
                <fieldset class="row">
                    <div class="col-12 col-md-6">
                        <label class="form__label" for="form-input-name">Name Reitschülerin:</label>
                        <input class="w-100" name="name" id="form-input-name" type="text" required>
                    </div>

                    <div class="col-12 col-md-6 ">
                        <label class="form__label" for="form-input-birthdate">Geburtsdatum:</label>
                        <input class="w-100" name="birthdate" id="form-input-birthdate" type="date" required>
                    </div>

                    <div class="col-12 col-md-6">
                        <label class="form__label" for="form-input-email">Email:</label>
                        <input class="w-100" name="email" id="form-input-email" type="email" required>
                    </div>

                    <div class="col-12 col-md-6">
                        <label class="form__label" for="form-input-phone">Telefonnummer:</label>
                        <input class="w-100" name="phone" id="form-input-phone" type="tel" required>
                    </div>

                    <div class="col-12 col-md-6">
                        <label class="form__label">Reiterfahrung:</label>
                        <input class="form-input-radio1" value="anfaenger" name="experience" type="radio" required>
                        <label class="form__input-radio">Anfänger</label>
                        <input class="form-input-radio2 form__input" name="experience" value="fortgeschritten"
                            type="radio" required>
                        <label class="form__input-radio">Fortgeschritten</label>
                    </div>

                    <div class="col-12 col-md-6">
                        <label class="form__label" for="form-input-topic">Anfrage bezüglich:</label>
                        <select id="form-input-topic" name="topic" class="w-100 h-50 form-input-topic" required>
                            <option>Reitunterricht</option>
                            <option>Voltegieren</option>
                            <option>Sonstiges</option>
                        </select>
                    </div>

                    <div class="col-12">
                    <label class="form__label" for="form-input-message">Nachricht:</label>
                    <textarea id="form-input-message" name="message"
                        placeholder="z. B. Ich möchte mich für einen Schnupperkurs anmelden." class="form__textarea"
                        rows="10"></textarea>
                    </div>

                    <div class="col-12">
                    <button class="button form__submit" type="submit">Abschicken</button>
                    <p class="form__notice" hidden>Anfrage wurde geschickt!</p>
                    </div>
                </fieldset>
            </form>
        `;
    }
    disconnectedCallback() {
        /* optional function */    
    };
}

customElements.define("rts-form", RTSForm);