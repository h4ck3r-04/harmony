import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"

const database = [
  {
    name: "PostgreSQL",
    description: "A powerful open-source relational database.",
    icon: Database,
  },
  {
    name: "MySQL",
    description: "A popular open-source relational database.",
    icon: Database,
  },
  {
    name: "MongoDB",
    description: "A document-oriented NoSQL database.",
    icon: Database,
  },
  {
    name: "Redis",
    description: "An in-memory key-value store for caching.",
    icon: Database,
  },
]

export default function Integrations() {
  return (
    <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {database.map((db, index) => (
        <Card
          key={index}
          className="relative overflow-hidden p-6"
        >
          <db.icon className="absolute top-4 right-4 w-10 h-10 text-foreground opacity-20" />
          <CardHeader className="relative z-10">
            <CardTitle className="text-foreground">{db.name}</CardTitle>
            <CardDescription>{db.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
