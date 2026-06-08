interface PageProps {
  params: {
    workspaceSlug: string;
  };
}

export default function WorkspacePage({ params }: PageProps) {
  const { workspaceSlug } = params;
  console.log("Workspace Slug:", workspaceSlug);
  return (
    <div>
      Workspace: {workspaceSlug}
    </div>
  );
}

