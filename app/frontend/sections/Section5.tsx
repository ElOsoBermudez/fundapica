import Image from "next/image"
import styles from "./Section5.module.css"

const collaborators = [
  {
    name: "SOC",
    href: "https://serveiocupacio.gencat.cat/",
    src: "/logo-soc.png",
  },
  {
    name: "ACTIC",
    href: "https://actic.gencat.cat/",
    src: "/actic.png",
  },
  {
    name: "CNDC",
    href: "https://dones.gencat.cat/ca/institut/cndc/",
    src: "/capcalera_cndc.png",
  },
]

export default function Section5() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wave} aria-hidden="true">
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className={styles.waveSvg}
        >
          <path
            d="M0,38C180,122,420,122,720,52C980,0,1210,18,1440,88L1440,140L0,140Z"
            fill="#EAFCFC"
          />
          <path
            d="M0,38C180,122,420,122,720,52C980,0,1210,18,1440,88"
            fill="none"
            stroke="#E05780"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.brandBlock}>
            <h2 className={styles.brandTitle}>Formación a tu medida</h2>
            <span className={styles.brandDivider} aria-hidden="true" />
            <p className={styles.bodyText}>
              Impulsamos el talento de personas y empresas con formación
              practica adaptada al mercado laboral.
            </p>
          </div>

          <div className={styles.contactBlock}>
            <h3 className={styles.blockTitle}>Contacto:</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>Barcelona, España</li>
              <li className={styles.contactItem}>
                <a href="mailto:contacto@tudominio.com" className={styles.link}>
                  academia@fundapica.org
                </a>
              </li>
              <li className={styles.contactItem}>
                <a href="tel:+34600000000" className={styles.link}>
                  +34 931 84 33 45
                </a>
<br></br>
                <a href="tel:+34600000000" className={styles.link}>
                +34 640 94 73 66</a>
                </li>
            </ul>
          </div>

          <nav className={styles.linksBlock} aria-label="Enlaces del footer">
            <h3 className={styles.blockTitle}>Colaboradores:</h3>
            <ul className={styles.logoList}>
              {collaborators.map((collaborator) => (
                <li key={collaborator.name}>
                  <a
                    href={collaborator.href}
                    className={styles.logoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={collaborator.src}
                      alt={collaborator.name}
                      width={140}
                      height={56}
                      className={styles.logoImage}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            {"\u00A9"} 2026 Fundapica. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
