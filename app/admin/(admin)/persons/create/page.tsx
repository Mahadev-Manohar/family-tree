import PersonForm from "@/components/admin/PersonForm";

export default function CreatePersonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Add Person
      </h1>

      <PersonForm />
    </div>
  );
}