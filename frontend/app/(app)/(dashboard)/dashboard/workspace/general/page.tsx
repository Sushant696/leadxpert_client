"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Save, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RESOURCE_BASED_ROLES } from "@/types/user";
import useWorkspaceStore from "@/store/workspace-store";
import SingleDropzone from "@/components/uploads/SingleDropzone";
import useUploadImage from "@/features/upload/hooks/useUploadImage";
import { useUpdateWorkspace } from "@/features/workspace/hooks/useUpdateWorkspace";

interface WorkspaceFormData {
  name: string;
  description?: string;
  businessType?: string;
  teamSize?: number;
  timezone?: string;
}

function Page() {
  const { workspace } = useWorkspaceStore();
  const uploadImageMutation = useUploadImage();
  const updateWorkspaceMutation = useUpdateWorkspace();
  const [workspaceImage, setWorkspaceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<WorkspaceFormData>({
    defaultValues: {
      name: workspace?.name,
      businessType: workspace?.businessType || undefined,
      teamSize: workspace?.teamSize || undefined,
    },
  });

  const hasChanges = isDirty || workspaceImage !== null;

  const handleImageSelect = (file: File | null) => {
    setWorkspaceImage(file);
    if (file) {
      const formData: FormData = new FormData();
      formData.append("image", file);
      uploadImageMutation.mutate(formData, {
        onSuccess: (data) => {
          setImageUrl(data?.data?.result.url || null);
          console.log("Image uploaded successfully:", data?.data?.result.url);
        },
        onError: (error) => {
          console.error("Error uploading image:", error);
        },
      });
    }
  };

  const onSubmit = async (data: WorkspaceFormData) => {

    if (
      (workspace?.id && workspace?.role === RESOURCE_BASED_ROLES.ADMIN) ||
      workspace?.role === RESOURCE_BASED_ROLES.SUPER_ADMIN
    ) {
      const cleanedData = {
        name: data.name,
        ...(data.businessType && { businessType: data.businessType }),
        ...(data.teamSize && { teamSize: data.teamSize }),
        ...(imageUrl && { profilePicture: imageUrl }),
      };

      await updateWorkspaceMutation.mutateAsync({
        workspaceId: workspace!.id,
        data: cleanedData,
      });
    }
    setWorkspaceImage(null);
    reset(data);
  };

  const handleCancel = () => {
    reset();
    setWorkspaceImage(null);
    setImagePreview(imagePreview);
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            General Settings
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your workspace information and preferences
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {hasChanges && (
            <div className="fixed sm:sticky bottom-0 left-0 right-0 sm:bottom-4 bg-card/95 sm:bg-card/50 backdrop-blur-sm border-t sm:border border-border sm:rounded-xl p-4 shadow-lg sm:shadow-none z-10">
              <div className="max-w-5xl mx-auto flex items-center justify-end gap-3">
                <Button
                  type="button"
                  onClick={handleCancel}
                  disabled={updateWorkspaceMutation.isPending}
                  variant="outline"
                  className="flex-1 sm:flex-initial"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={uploadImageMutation.isPending}
                  className="flex-1 sm:flex-initial bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/25"
                >
                  {updateWorkspaceMutation.isPending ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="bg-card rounded-xl sm:rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-28 sm:w-32">
                    <SingleDropzone
                      onFileSelect={handleImageSelect}
                      preview={imagePreview}
                      setPreview={setImagePreview}
                    />
                  </div>
                  <p className="font-medium text-foreground">
                    Workspace Profile
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="workspace-name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Workspace Name <span className="text-error">*</span>
                  </label>
                  <input
                    id="workspace-name"
                    type="text"
                    {...register("name", {
                      required: "Workspace name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all ${errors.name ? "border-error" : "border-input"
                      }`}
                    placeholder="Enter workspace name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-error">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-between gap-6 items-center">
                <div className="w-1/2">
                  <label
                    htmlFor="workspace-type"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Business Type
                  </label>
                  <select
                    id="workspace-type"
                    {...register("businessType")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select business type</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Development Company">
                      Development Company
                    </option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Design Agency">Design Agency</option>
                    <option value="Other Services">Other Services</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="team-size"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Team Size
                  </label>
                  <select
                    id="team-size"
                    {...register("teamSize", { valueAsNumber: true })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select team size</option>
                    <option value={5}>1-10</option>
                    <option value={30}>11-50</option>
                    <option value={125}>51-200</option>
                    <option value={350}>201-500</option>
                    <option value={501}>500+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
