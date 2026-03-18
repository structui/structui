import React from "react";
import { Navigate, useParams } from "react-router-dom";

import { DocsPageShell, DOC_SECTION_CONTENT } from "./shared";

type DocSectionId = keyof typeof DOC_SECTION_CONTENT;

export const DocsSectionPage = (): React.JSX.Element => {
  const { sectionId } = useParams<{ sectionId: string }>();

  if (!sectionId || !(sectionId in DOC_SECTION_CONTENT)) {
    return <Navigate to="/docs" replace />;
  }

  const section = DOC_SECTION_CONTENT[sectionId as DocSectionId];

  return <DocsPageShell title={section.title}>{section.content}</DocsPageShell>;
};
