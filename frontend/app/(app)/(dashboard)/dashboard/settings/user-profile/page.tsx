'use client'

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { TickCircle } from 'iconsax-reactjs';
import {
  Camera,
  Mail,
  User,
  Shield,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2
} from 'lucide-react';

import getInitials from '@/utils/getInitials';
import useAuthStore from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import useUploadImage from '@/features/upload/hooks/useUploadImage';
import useUpdateUser from '@/features/user/hooks/useUpdateUser';

interface ProfileFormData {
  name: string;
}

const ProfileSettings = () => {
  const { user } = useAuthStore();
  const updateUserMutation = useUpdateUser();
  const uploadImageMutation = useUploadImage();

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: { name: user?.name || '' }
  });

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    : '2024';

  const lastLogin = user?.lastLoginAt
    ? new Date(user.lastLoginAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'First Login';

  const handleCameraClick = () => {
    if (isEditing && !uploadImageMutation.isPending) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    const formData = new FormData();
    formData.append('image', file);

    uploadImageMutation.mutate(formData, {
      onSuccess: (response) => {
        const url = response?.data?.result.url || response?.url;
        setUploadedImageUrl(url);
      },
      onError: () => {
        setPreviewImage(null);
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewImage(null);
    setUploadedImageUrl(null);
    reset({ name: user?.name || '' });
  };

  const onSubmit = (data: ProfileFormData) => {
    const updateData = {
      name: data.name,
      profilePicture: uploadedImageUrl || user?.profilePicture
    };
    updateUserMutation.mutate(updateData, {
      onSuccess: () => {
        setIsEditing(false);
        setPreviewImage(null);
        setUploadedImageUrl(null);
      }
    });
  };

  const displayImage = previewImage || user?.profilePicture;
  const isUploading = uploadImageMutation.isPending;
  const isUpdating = updateUserMutation.isPending;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-background/50 pb-20">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        disabled={isUploading}
      />

      <div className="h-48 w-full bg-gradient-to-r from-primary-dark via-primary to-primary-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="relative -mt-20 mb-8">
          <div className="bg-surface rounded-2xl shadow-xl border border-border/50 overflow-hidden backdrop-blur-sm">
            <div className="p-8 flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-border/50">

              <div className="relative group shrink-0">
                <div className="h-32 w-32 rounded-2xl bg-surface p-1 shadow-sm ring-1 ring-border/50 transition-all duration-300">
                  <div className="h-full w-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden relative">

                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt="Profile"
                        className={`w-full h-full object-cover ${isUploading ? 'opacity-50' : ''}`}
                      />
                    ) : (
                      <span className="text-4xl font-black text-primary/20">
                        {getInitials(user?.name) || 'U'}
                      </span>
                    )}

                    {isUploading && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      </div>
                    )}

                    <div
                      onClick={handleCameraClick}
                      className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center 
                        ${isEditing && !isUploading ? 'opacity-0 group-hover:opacity-100 cursor-pointer' : 'hidden'}
                      `}
                    >
                      <Camera className="text-white w-8 h-8 drop-shadow-md" />
                    </div>
                  </div>
                </div>

                {!isEditing && (
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-[3px] border-surface flex items-center justify-center ${user?.isActive ? 'bg-success' : 'bg-muted-foreground'}`}
                  >
                    {user?.isActive && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
                  </div>
                )}
              </div>

              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-foreground tracking-tight capitalize">{user?.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                    {user?.role || 'User'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {user?.email}
                  </span>
                  <span className="hidden md:flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Joined {joinDate}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pb-2">
                <Button
                  onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                  variant={isEditing ? "destructive" : "default"}
                  disabled={isUpdating}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/50">

              <div className="lg:col-span-2 p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>
                  <p className="text-sm text-muted-foreground">Manage your display name and basic details.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        {...register('name', { required: true })}
                        disabled={!isEditing}
                        className="w-full bg-surface-variant/30 border border-border rounded-lg px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:opacity-70 disabled:bg-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Role</label>
                      <input
                        type="text"
                        value={user?.role || 'User'}
                        disabled
                        className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="w-full bg-surface-variant/30 border border-border rounded-lg px-4 py-3 text-sm font-medium pr-24 outline-none disabled:opacity-100 disabled:bg-muted/30"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {user?.isEmailVerified ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success/10 text-success text-xs font-bold border border-success/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            VERIFIED
                          </span>
                        ) : (
                          <button type="button" className="text-xs font-bold text-warning hover:underline flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Verify
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="pt-4 flex justify-end">
                      <Button
                        type="submit"
                        disabled={isUpdating || isUploading}
                      >
                        {isUpdating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </div>
                  )}
                </form>
              </div>

              <div className="lg:col-span-1 bg-surface-variant/20 p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-primary" />
                    Account Status
                  </h3>
                  <p className="text-sm text-muted-foreground">Security and activity monitoring.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-surface hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground">Last Login</span>
                        <span className="text-[10px] text-muted-foreground">Session Activity</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-foreground">{lastLogin}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-surface hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <TickCircle className="w-4 h-4" variant="Bold" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground">Status</span>
                        <span className="text-[10px] text-muted-foreground">Account State</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-success/10 text-success border border-success/20">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
