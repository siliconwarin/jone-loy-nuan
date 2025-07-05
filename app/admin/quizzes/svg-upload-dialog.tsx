"use client";

import { useState, ChangeEvent } from "react";
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
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { upsertScenarioImage } from "@/lib/actions/images";

interface SvgUploadDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	scenarioId: string;
	onUploadComplete: () => void;
}

export function SvgUploadDialog({
	open,
	onOpenChange,
	scenarioId,
	onUploadComplete,
}: SvgUploadDialogProps) {
	const [scenario, setScenario] = useState<string>("");
	const [variant, setVariant] = useState<"normal" | "result">("normal");
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0] || null;
		setFile(f);
	};

	const handleUpload = async () => {
		if (!scenarioId) {
			setError("Scenario ID is missing. Cannot upload.");
			return;
		}

		setIsUploading(true);
		setError(null);
		const supabase = createClient();
		const filePath = `${scenarioId}/${variant}.svg`;

		try {
			const { data: uploadData, error: uploadError } = await supabase.storage
				.from("scenario-images")
				.upload(filePath, file as File, {
					cacheControl: "3600",
					upsert: true,
				});

			if (uploadError) {
				throw uploadError;
			}

			// Call server action to update the database
			await upsertScenarioImage({
				scenario_id: scenarioId,
				variant: variant,
				file_path: uploadData.path,
			});

			toast.success(`Successfully uploaded ${variant} image!`);
			onUploadComplete();
		} catch (err: unknown) {
			console.error("Upload error:", err);
			const errorObj = err as { message?: string; error?: string };
			const errorMessage =
				errorObj.message?.includes("bucket not found") ||
				errorObj.error === "Not found"
					? "Storage bucket 'scenario-images' not found. Please create it in your Supabase project."
					: errorObj.message || "An unknown error occurred.";
			setError(errorMessage);
			toast.error(`Upload failed: ${errorMessage}`);
		} finally {
			setIsUploading(false);
		}
	};

	const handleOpenChange = (isOpen: boolean) => {
		onOpenChange(isOpen);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Upload Scenario SVG</DialogTitle>
					<DialogDescription>
						เลือกหมายเลข Scenario ใส่ไฟล์ SVG แล้วกดอัพโหลด
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="scenario">Scenario Number</Label>
						<Input
							id="scenario"
							value={scenario}
							onChange={(e) => setScenario(e.target.value)}
							placeholder="เช่น 1, 2, 3"
							type="number"
						/>
					</div>
					<div className="space-y-2">
						<Label>Variant</Label>
						<div className="flex gap-4">
							<label className="flex items-center gap-1 text-sm">
								<input
									type="radio"
									name="variant"
									value="normal"
									checked={variant === "normal"}
									onChange={() => setVariant("normal")}
								/>
								Normal
							</label>
							<label className="flex items-center gap-1 text-sm">
								<input
									type="radio"
									name="variant"
									value="result"
									checked={variant === "result"}
									onChange={() => setVariant("result")}
								/>
								Result
							</label>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="file">SVG File</Label>
						<Input
							id="file"
							type="file"
							accept=".svg"
							onChange={handleFileChange}
						/>
					</div>
					{isUploading && (
						<div className="text-sm text-gray-600">Uploading...</div>
					)}
					{error && <p className="text-sm text-red-600">{error}</p>}
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => handleOpenChange(false)}
						disabled={isUploading}
					>
						Cancel
					</Button>
					<Button
						onClick={handleUpload}
						disabled={!file || !scenario || isUploading}
					>
						Upload
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
