"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutGrid, List, MoreVertical, FileEdit, Trash2, Share2, FileText, Plus } from "lucide-react"
import { useState } from "react"
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { ShareDialog } from "@/components/dialogs/share-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";

// Zod schemas
const projectNameSchema = z.string().min(1, "Project name is required").max(100, "Project name is too long");

// Template interfaces
interface Template {
  title: string;
  description: string;
  category: 'all' | 'business' | 'personal' | 'education' | 'general';
}

export default function Dashboard() {
  const [isRecentGridView, setIsRecentGridView] = useState(true);
  const [isSharedGridView, setIsSharedGridView] = useState(true);
  const [isTemplateGridView, setIsTemplateGridView] = useState(true);
  const [isYourWorkGridView, setIsYourWorkGridView] = useState(true);
  const [newProjectName, setNewProjectName] = useState("");
  const [templateProjectName, setTemplateProjectName] = useState("");
  const [existingProjects] = useState(["Untitled Project", "Untitled Project 1"]);
  const [formErrors, setFormErrors] = useState<{ newProject?: string, templateProject?: string }>({});

  const getUniqueProjectName = (baseName: string) => {
    let counter = 1;
    let newName = baseName || "Untitled Project";
    while (existingProjects.includes(newName)) {
      newName = `${baseName || "Untitled Project"} ${counter}`;
      counter++;
    }
    return newName;
  };

  const handleDelete = (docTitle: string) => {
    // Handle delete logic here
    console.log(`Deleting ${docTitle}`);
  };

  const handleCreateBlankProject = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedName = projectNameSchema.parse(newProjectName);
      const uniqueName = getUniqueProjectName(validatedName);
      console.log("Creating blank project:", uniqueName);
      setNewProjectName("");
      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors({
          newProject: error.errors[0].message
        });
      }
    }
  };

  const handleCreateFromTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedName = projectNameSchema.parse(templateProjectName);
      const uniqueName = getUniqueProjectName(validatedName);
      console.log("Creating from template:", uniqueName);
      setTemplateProjectName("");
      setFormErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors({
          templateProject: error.errors[0].message
        });
      }
    }
  };

  const templatesList: Template[] = [
    { title: "Meeting Notes", description: "Standard format for meeting minutes and action items", category: "general" },
    { title: "Project Proposal", description: "Structured template for project pitches", category: "general" },
    { title: "Weekly Report", description: "Weekly progress and metrics report format", category: "general" },
    { title: "Marketing Plan", description: "Comprehensive marketing strategy template", category: "general" },
    { title: "Budget Template", description: "Financial planning and tracking template", category: "general" },
    { title: "Team Goals", description: "Team OKRs and goals tracking template", category: "general" },
    { title: "Product Roadmap", description: "Product development timeline template", category: "general" },
    { title: "Content Calendar", description: "Content planning and scheduling template", category: "general" },
    { title: "Business Plan", description: "Complete business planning template", category: "business" },
    { title: "Invoice Template", description: "Professional invoice format", category: "business" },
    { title: "Proposal Template", description: "Business proposal format", category: "business" },
    { title: "Journal", description: "Personal journaling template", category: "personal" },
    { title: "Goal Tracker", description: "Personal goals tracking template", category: "personal" },
    { title: "Budget Planner", description: "Personal finance template", category: "personal" },
    { title: "Study Plan", description: "Academic study planning template", category: "education" },
    { title: "Research Paper", description: "Academic paper format", category: "education" },
    { title: "Lecture Notes", description: "Structured lecture notes template", category: "education" }
  ];

  const templates = {
    all: templatesList,
    business: templatesList.filter(t => t.category === 'business'),
    personal: templatesList.filter(t => t.category === 'personal'),
    education: templatesList.filter(t => t.category === 'education'),
    general: templatesList.filter(t => t.category === 'general')
  };

  return (
    <main className="min-h-[97vh] relative px-4">

      {/* Templates Section */}
      <div className="flex flex-col gap-4 mb-8">
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Create</Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleCreateBlankProject}>
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                      <DialogDescription>
                        Enter a name for your new blank project
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Input
                        placeholder="Untitled Project"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        required
                      />
                      {formErrors.newProject && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.newProject}</p>
                      )}
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Project</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Browse Templates</Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleCreateFromTemplate}>
                    <DialogHeader>
                      <DialogTitle>Choose a Template</DialogTitle>
                      <DialogDescription>
                        Select a template and name your project
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Input
                        placeholder="Untitled Project"
                        value={templateProjectName}
                        onChange={(e) => setTemplateProjectName(e.target.value)}
                        required
                        className="mb-4"
                      />
                      {formErrors.templateProject && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.templateProject}</p>
                      )}

                      <div className="flex justify-between items-center mb-4">
                        <Tabs defaultValue="all" className="w-full">
                          <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="business">Business</TabsTrigger>
                            <TabsTrigger value="personal">Personal</TabsTrigger>
                            <TabsTrigger value="education">Education</TabsTrigger>
                          </TabsList>

                          <div className="flex justify-end mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setIsTemplateGridView(true)}
                              className={isTemplateGridView ? "bg-accent" : ""}
                            >
                              <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setIsTemplateGridView(false)}
                              className={!isTemplateGridView ? "bg-accent" : ""}
                            >
                              <List className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="h-[400px] overflow-y-auto">
                            {Object.entries(templates).map(([category, items]) => (
                              <TabsContent key={category} value={category}>
                                {isTemplateGridView ? (
                                  <div className="grid grid-cols-2 gap-4">
                                    {items.map((template, i) => (
                                      <Card key={i} className="cursor-pointer hover:border-primary">
                                        <CardHeader>
                                          <CardTitle className="text-base">{template.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <p className="text-sm text-muted-foreground">{template.description}</p>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex flex-col gap-2">
                                    {items.map((template, i) => (
                                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-primary">
                                        <div>
                                          <h3 className="font-medium">{template.title}</h3>
                                          <p className="text-sm text-muted-foreground">{template.description}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </TabsContent>
                            ))}
                          </div>
                        </Tabs>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create from Template</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
                      onDelete={() => handleDelete(doc.title)}
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

      {/* Your Work Section */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-center border-b-[1px] border-accent-foreground/50">
          <h1 className="text-2xl py-2">Your Work</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsYourWorkGridView(true)}
              className={isYourWorkGridView ? "bg-accent" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsYourWorkGridView(false)}
              className={!isYourWorkGridView ? "bg-accent" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isYourWorkGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Personal Goals 2024", date: "Created Dec 20, 2023" },
              { title: "Project Ideas", date: "Created Dec 18, 2023" },
              { title: "Weekly Tasks", date: "Created Dec 16, 2023" }
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
                      onDelete={() => handleDelete(doc.title)}
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
              { title: "Personal Goals 2024", date: "Created Dec 20, 2023" },
              { title: "Project Ideas", date: "Created Dec 18, 2023" },
              { title: "Weekly Tasks", date: "Created Dec 16, 2023" }
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
