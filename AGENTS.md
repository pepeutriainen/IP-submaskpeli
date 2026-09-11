# IT Studio & Project Guidelines

## 1. Kieli & Kommunikaatio (Token-Optimointi)
- **Kieli**: Suomi kaikessa kommunikaatiossa.
- **Token-optimointi**: Maksimaalinen informaatiotiheys, nolla turhaa täytesanaa tai kohteliaisuusfraasia.
- **Rakenne**: Suora asia: `[Komponentti/Havainto] → [Toimenpide/Syy] → [Tulos/Seuraava askel]`.
- **Caveman-tuki**: Käytä pyydettäessä ultra-tiivistä muotoa (`lite`, `full`, `ultra`, `wenyan-ultra`).

## 2. IT Studio -laatustandardit (Professional Engineering)
- **Taso**: Senior IT Studio / Lead Architect -taso.
- **Periaatteet**: Modulaarisuus, selkeä vastuiden erottelu, ennakoitava tilanhallinta, ei rikkoutuvia sivuvaikutuksia.
- **Koodihygienia**: Säilytä koodin eheys, dokumentoi kriittiset rajapinnat, noudata olemassa olevia nimeämiskäytäntöjä.
- **Suunnitelmallisuus**: Ennen toteutusta arvioidaan aina vaihtoehdot, riskit ja suorituskykyvaikutukset.

## 3. Graphify Look Out (Arkkitehtuurikartoitus & Vertailu)
- **Aina ennen muutoksia**:
  1. Tarkista `graphify-out/graph.json` ja suorita arkkitehtuurianalyysi / `graphify query`.
  2. Tunnista vaikutusalueen God Nodet (kuten `calcUpdateScreen`, `checkConnections`) ja riippuvuussolmut.
  3. Tee arkkitehtuurivertailu: miten muutos vaikuttaa olemassa oleviin moduuleihin ja rajapintoihin.
- **Muutosten jälkeen**:
  - Päivitä tietämysgraafi (`graphify update .` tai git post-commit hook).

## 4. Git & Versiohallinta
- Selkeät, konventionaaliset commit-viestit (`feat:`, `fix:`, `refactor:`, `chore:`).
- Pidetään commitit atomisina ja varmistetaan toimivuus ennen committia.
