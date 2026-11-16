import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Partner Institutions | EmpiricalOpen",
  description: "Explore the institutions in the EmpiricalOpen academic network.",
}

const partners = [
  "Federal College of Education, Eha-Amufu, Enugu State, Nigeria",
  "Enugu State College of Education (Technical), Enugu, Enugu State, Nigeria",
  "Chukwuemeka Odumegwu Ojukwu University, Igbariam, Anambra State, Nigeria",
  "Institute of Management and Technology, Enugu, Enugu State, Nigeria",
  "Edo State College of Education, Igueben, Edo State, Nigeria",
  "Kogi State College of Education, Ankpa, Kogi State, Nigeria",
  "Federal College of Education, Umunze, Anambra State, Nigeria",
  "Federal College of Education (Tech), Isu, Ebonyi State, Nigeria",
  "Alvan Ikoku Federal University of Education, Owerri, Imo State, Nigeria",
  "Prince Abubakar Audu University, Anyigba, Kogi State, Nigeria",
  "Rivers State University, Port Harcourt, Rivers State, Nigeria",
  "Akwa Ibom State College of Education, Afaha Nsit, Akwa Ibom State, Nigeria",
  "Ignatius Ajuru University of Education, Rumuolumeni, Port Harcourt, Rivers State, Nigeria",
  "Federal College of Education (Tech), Ekiadolor, Edo State, Nigeria",
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-paper text-foreground">
      <SiteHeader />
      <main>
        <section className="border-b border-line bg-paper-raised">
          <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-8 md:py-20">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-gold">
              — INSTITUTIONAL NETWORK
            </p>
            <h1 className="max-w-2xl font-serif text-4xl font-semibold text-ink md:text-5xl">
              Partner Institutions
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-soft">
              Meet the institutions collaborating to strengthen open scholarly discovery and research across Nigeria.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[1180px] px-6 md:px-8">
            <ol className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
              {partners.map((partner, index) => (
                <li
                  key={partner}
                  className="flex gap-4 border-b border-line py-5 first:border-t md:first:border-t md:[&:nth-child(2)]:border-t"
                >
                  <span className="shrink-0 pt-0.5 font-mono text-xs text-gold" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-lg leading-snug text-ink">
                    {partner}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
