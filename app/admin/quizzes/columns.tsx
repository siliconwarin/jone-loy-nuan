"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Database } from "@/lib/database.types";
import { type QuestionRow as AdminQuestionRow } from "@/lib/actions/questions";

type QuestionRow = AdminQuestionRow & {
	onEdit?: () => void;
	onDelete?: () => void;
	onUploadSvg?: () => void;
};

export const columns: ColumnDef<QuestionRow>[] = [
	{
		accessorKey: "order_index",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Order
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="pl-4">{row.getValue("order_index")}</div>
		),
	},
	{
		accessorKey: "question_text",
		header: "Question",
		cell: ({ row }) => {
			const text = row.getValue("question_text") as string;
			return (
				<div className="font-medium">
					{text.length > 100 ? `${text.substring(0, 100)}...` : text}
				</div>
			);
		},
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const { onEdit, onDelete, onUploadSvg } = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => onEdit?.()}>Edit</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onUploadSvg?.()}>
							Upload SVG
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => onDelete?.()}
							className="text-red-600"
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
];
