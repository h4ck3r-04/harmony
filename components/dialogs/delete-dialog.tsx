"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteDialogProps {
  onDelete?: (title: string) => void
  title?: string
  description?: string
  trigger?: React.ReactNode
  type?: "document" | "shared"
}

export function DeleteDialog({
  onDelete,
  title,
  type = "document",
  trigger,
}: DeleteDialogProps) {
  const description = type === "document"
    ? `Are you sure you want to delete "${title}"? This action cannot be undone.`
    : `Are you sure you want to remove "${title}" from shared documents? You will no longer have access to this document.`;

  const handleDelete = () => {
    if (onDelete && title) {
      onDelete(title);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {type === "document" ? "Delete" : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}