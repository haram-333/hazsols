import ServiceDetailTemplate from "@/app/components/service-detail-template";

export default function CustomSoftwareServicePage() {
  return (
    <ServiceDetailTemplate
      serviceType="custom-software"
      category="CUSTOM SOFTWARE"
      title="Software Built for Your Team"
      buttonText="Scope Custom Software"
    />
  );
}
