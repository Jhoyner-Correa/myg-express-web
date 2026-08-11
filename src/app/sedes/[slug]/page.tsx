import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANCHES, type Branch } from "@/lib/constants";
import { SedeDetailClient } from "@/components/sections/sede-detail-client";

interface SedePageProps {
  params: Promise<{ slug: string }>;
}

function getBranchBySlug(slug: string): Branch | undefined {
  return BRANCHES.find((b) => b.slug === slug);
}

export async function generateStaticParams() {
  return BRANCHES.map((branch) => ({
    slug: branch.slug,
  }));
}

export async function generateMetadata({ params }: SedePageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    return {
      title: "Sede No Encontrada",
    };
  }

  return {
    title: `${branch.name} - ${branch.region}`,
    description: `Información detallada, foto del local, puntos de envío y recojo, teléfono y horario de la ${branch.name} en ${branch.region}. MyG Express.`,
    openGraph: {
      title: `${branch.name} | MyG Express`,
      description: `Información del local y puntos de envío y recojo en ${branch.name} - ${branch.region}.`,
      images: [branch.image],
    },
  };
}

export default async function SedeDetailPage({ params }: SedePageProps) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    return notFound();
  }

  return <SedeDetailClient branch={branch} />;
}
