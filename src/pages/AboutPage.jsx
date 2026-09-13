import { Link } from "react-router-dom";
import { ROUTES } from "../app/routes.js";
import { aboutApplications, aboutTimeline } from "../data/aboutContent.js";
import heroMachine from "../../img/GENIE_1.webp";
import applicationsGiraffe from "../../img/jirafa_1.webp";
import "./about-page.css";

export default function AboutPage() {
  return (
    <>
      <title>Sobre Nosotros | LEVEX</title>

      <div className="about-page">
        <section className="about-hero" aria-labelledby="about-hero-title">
          <div className="about-hero__inner">
            <div className="about-hero__copy">
              <p className="about-eyebrow about-eyebrow--light">LEVEX</p>
              <h1 id="about-hero-title">¿Quiénes somos?</h1>
              <p className="about-hero__lede">
                Elevación segura, alcance preciso y máximo rendimiento
              </p>
              <Link className="about-hero__cta" to={ROUTES.contact}>
                <span>Hablemos de tu proyecto</span>
                <span className="about-hero__cta-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>

            <div className="about-hero__media" aria-hidden="true">
              <span className="about-hero__measure about-hero__measure--top" />
              <span className="about-hero__measure about-hero__measure--bottom" />
              <img
                src={heroMachine}
                alt=""
                width="1254"
                height="1254"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section
          className="precision-section"
          aria-labelledby="precision-section-title"
        >
          <div className="precision-section__inner scroll-reveal">
            <header className="precision-section__heading">
              <p className="about-eyebrow">Precisión en altura</p>
              <h2 id="precision-section-title">
                Elevación segura, alcance preciso y máximo rendimiento
              </h2>
            </header>

            <div className="precision-section__body">
              <p>
                En LEVEX ofrecemos{" "}
                <strong className="highlight-green">
                  plataformas articuladas
                </strong>{" "}
                y{" "}
                <strong className="highlight-green">
                  plataformas de tijera
                </strong>{" "}
                de última generación, ideales para trabajos en altura que
                requieren alcance, precisión y seguridad. Todos nuestros equipos
                cuentan con certificación.
              </p>
              <p>
                Son la solución perfecta para mantenimiento, construcción,
                instalaciones industriales y proyectos especializados.
              </p>

              <ul
                className="precision-section__principles"
                aria-label="Principios LEVEX"
              >
                <li>Seguridad</li>
                <li>Precisión</li>
                <li>Rendimiento</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="timeline-section" aria-label="Historia de LEVEX">
          <div className="timeline-section__inner">
            <span className="timeline-section__track" aria-hidden="true">
              <span className="timeline-section__fill" />
            </span>

            <ol className="timeline-section__stages">
              {aboutTimeline.map((stage) => (
                <li className="timeline-stage" key={stage.year}>
                  <span className="timeline-stage__marker" aria-hidden="true" />
                  <article>
                    <h2>
                      <time dateTime={stage.year}>{stage.year}</time>
                      <span> — {stage.title}</span>
                    </h2>
                    <p>{stage.description}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="applications-section"
          aria-labelledby="applications-section-title"
        >
          <div className="applications-section__inner scroll-reveal">
            <header className="applications-section__header">
              <p className="about-eyebrow about-eyebrow--accent">
                Sectores y proyectos
              </p>
              <h2 id="applications-section-title">Aplicaciones</h2>
              <p>Nuestras plataformas articuladas son ideales para:</p>
            </header>

            <div className="applications-section__layout">
              <figure className="applications-section__visual">
                <img
                  src={applicationsGiraffe}
                  alt="Jirafa con casco y chaleco de seguridad"
                  width="1024"
                  height="1536"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  Alcance para proyectos que exigen más altura.
                </figcaption>
              </figure>

              <ol className="applications-grid">
                {aboutApplications.map((application, index) => (
                  <li key={application}>
                    <span
                      className="applications-grid__number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{application}</h3>
                    <span
                      className="applications-grid__line"
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
