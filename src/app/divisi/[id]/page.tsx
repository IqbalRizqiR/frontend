import Header from "./_components/Header";
import ProgramKerjaHead from "./_components/ProgramKerjaHead";
import Portofolio from "./_components/Portofolio";
import Team from "./_components/Team";
import { divisi } from "@/app/_components/const/datas";

type Params = Promise<{id: string}>;

export async function generateStaticParams() {
  return divisi.map((d) => ({
    id: d.id,
  }));
}

export default async function DivisionPage(props: { params: Params }) {
  const params  = await props.params;
  const id = await params.id;

  const division = divisi.find((d) => d.id === id);
  if (!division) {
    return <div>Division not found</div>;
  }
  return (
    <>
      <Header data={division} />
      <ProgramKerjaHead name={division.name} prokja={division.prokja} />
      <Portofolio divisi={division}/>
      <Team divisi={division}/>
    </>
  );
}
