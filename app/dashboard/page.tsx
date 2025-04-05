"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutGrid, List, MoreVertical, FileEdit, Trash2, Share2, FileText } from "lucide-react"
import { useState } from "react"
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { ShareDialog } from "@/components/dialogs/share-dialog";

export default function Dashboard() {
  const [isRecentGridView, setIsRecentGridView] = useState(true);
  const [isSharedGridView, setIsSharedGridView] = useState(true);

  const handleDelete = (docTitle: string) => {
    // Handle delete logic here
    console.log(`Deleting ${docTitle}`);
  };

  return (
    <main className="min-h-[97vh] relative px-4">

      {/* Templates Section */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-2xl py-2 border-b-[1px] border-accent-foreground/50">Templates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                <CardTitle>Blank Document</CardTitle>
              </div>
              <CardDescription>Start with an empty document</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Create a fresh document to start writing from scratch</p>
            </CardContent>
            <CardFooter>
              <Button>Create</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MoreVertical className="h-6 w-6" />
                <CardTitle>Use Template</CardTitle>
              </div>
              <CardDescription>Choose from existing templates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Select from our collection of pre-formatted templates</p>
            </CardContent>
            <CardFooter>
              <Button>Browse Templates</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Recent Documents Section */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-center border-b-[1px] border-accent-foreground/50">
          <h1 className="text-2xl py-2">Recent Documents</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsRecentGridView(true)}
              className={isRecentGridView ? "bg-accent" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsRecentGridView(false)}
              className={!isRecentGridView ? "bg-accent" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isRecentGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Q4 Report", date: "Modified Dec 15, 2023" },
              { title: "Product Roadmap", date: "Modified Dec 14, 2023" },
              { title: "Team OKRs", date: "Modified Dec 13, 2023" }
            ].map((doc, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle><a href="#" className="hover:underline">{doc.title}</a></CardTitle>
                  <CardDescription>{doc.date}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-between">
                  <Button variant="outline" asChild>
                    <a href="#">Open</a>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href="#">
                        <FileEdit className="h-4 w-4" />
                      </a>
                    </Button>
                    <ShareDialog
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      }
                      title={doc.title}
                      url="#"
                    />
                    <DeleteDialog
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                      title={doc.title}
                      // onDelete={() => handleDelete(doc.title)}
                      type="document"
                    />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {[
              { title: "Q4 Report", date: "Modified Dec 15, 2023" },
              { title: "Product Roadmap", date: "Modified Dec 14, 2023" },
              { title: "Team OKRs", date: "Modified Dec 13, 2023" }
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium"><a href="#" className="hover:underline">{doc.title}</a></h3>
                  <p className="text-sm text-muted-foreground">{doc.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a href="#">
                      <FileEdit className="h-4 w-4" />
                    </a>
                  </Button>
                  <ShareDialog
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    }
                    title={doc.title}
                    url="#"
                  />
                  <DeleteDialog
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                    title={doc.title}
                    onDelete={() => handleDelete(doc.title)}
                    type="document"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shared With Me Section */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between items-center border-b-[1px] border-accent-foreground/50">
          <h1 className="text-2xl py-2">Shared With Me</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSharedGridView(true)}
              className={isSharedGridView ? "bg-accent" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSharedGridView(false)}
              className={!isSharedGridView ? "bg-accent" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isSharedGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Project Timeline", owner: "Sarah K.", date: "Shared Dec 12, 2023" },
              { title: "Budget Overview", owner: "Mike R.", date: "Shared Dec 10, 2023" },
              { title: "Marketing Plan", owner: "Alex T.", date: "Shared Dec 8, 2023" }
            ].map((doc, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle><a href="#" className="hover:underline">{doc.title}</a></CardTitle>
                  <CardDescription>Shared by {doc.owner}</CardDescription>
                  <CardDescription>{doc.date}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-between">
                  <Button variant="outline" asChild>
                    <a href="#">Open</a>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href="#">
                        <FileEdit className="h-4 w-4" />
                      </a>
                    </Button>
                    <ShareDialog
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      }
                      title={doc.title}
                      url="#"
                    />
                    <DeleteDialog
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                      title={doc.title}
                      onDelete={() => handleDelete(doc.title)}
                      type="shared"
                    />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {[
              { title: "Project Timeline", owner: "Sarah K.", date: "Shared Dec 12, 2023" },
              { title: "Budget Overview", owner: "Mike R.", date: "Shared Dec 10, 2023" },
              { title: "Marketing Plan", owner: "Alex T.", date: "Shared Dec 8, 2023" }
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium"><a href="#" className="hover:underline">{doc.title}</a></h3>
                  <p className="text-sm text-muted-foreground">Shared by {doc.owner}</p>
                  <p className="text-sm text-muted-foreground">{doc.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a href="#">
                      <FileEdit className="h-4 w-4" />
                    </a>
                  </Button>
                  <ShareDialog
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    }
                    title={doc.title}
                    url="#"
                  />
                  <DeleteDialog
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                    title={doc.title}
                    onDelete={() => handleDelete(doc.title)}
                    type="shared"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}