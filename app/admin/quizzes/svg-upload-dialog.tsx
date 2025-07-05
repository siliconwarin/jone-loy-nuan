"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { upsertScenarioImage } from "@/lib/actions/images";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface SvgUploadDialogProps {
	scenarioId: string;
	onClose: () => void;
	open: boolean;
}

export function SvgUploadDialog({
	open,
	onClose,
	scenarioId,
}: SvgUploadDialogProps) {
	const [normalFile, setNormalFile] = useState<File | null>(null);
	const [resultFile, setResultFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const router = useRouter();

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
		variant: "normal" | "result"
	) => {
		const file = e.target.files?.[0] || null;
		if (variant === "normal") {
			setNormalFile(file);
		} else {
			setResultFile(file);
		}
	};

	const handleUpload = async (file: File, variant: "normal" | "result") => {
		const supabase = createClient();
		const filePath = `${scenarioId}/${variant}.svg`;

		const { data: uploadData, error: uploadError } = await supabase.storage
			.from("scenario-images")
			.upload(filePath, file, { upsert: true });

		if (uploadError) throw uploadError;

		await upsertScenarioImage({
			scenario_id: scenarioId,
			variant: variant,
			file_path: uploadData.path,
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!normalFile && !resultFile) {
			toast.error("Please select at least one file to upload.");
			return;
		}

		setIsUploading(true);
		try {
			if (normalFile) {
				await handleUpload(normalFile, "normal");
				toast.success("Normal image uploaded successfully!");
			}
			if (resultFile) {
				await handleUpload(resultFile, "result");
				toast.success("Result image uploaded successfully!");
			}
			router.refresh();
			onClose();
		} catch (err: unknown) {
			const error = err as Error;
			console.error("Upload error:", error);
			toast.error(`Upload failed: ${error.message}`);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Upload Images for Scenario {scenarioId}</DialogTitle>
						<DialogDescription>
							Upload normal and result SVG images for this question.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="normal-file">Normal State Image (SVG)</Label>
							<Input
								id="normal-file"
								type="file"
								accept=".svg"
								onChange={(e) => handleFileChange(e, "normal")}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="result-file">Result State Image (SVG)</Label>
							<Input
								id="result-file"
								type="file"
								accept=".svg"
								onChange={(e) => handleFileChange(e, "result")}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isUploading}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={(!normalFile && !resultFile) || isUploading}
						>
							{isUploading ? "Uploading..." : "Upload Images"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
