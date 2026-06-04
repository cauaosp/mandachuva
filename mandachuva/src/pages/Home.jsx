import { CitySearch } from "./CitySearch";
import { StateSearch } from "./StateSearch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useState } from "react";
import { HealthCheck } from "./HealthCheck";

export function Home() {
  const [selectCity, setSelectCity] = useState("");
  const [tab, setTab] = useState("cidade");

  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      className="border rounded-lg mx-auto max-w-240 w-full my-5 py-5"
    >
      <TabsList className="mx-auto columns-3 gap-3 shadow-sm">
        <TabsTrigger value="cidade" className="uppercase text-sm">
          cidade
        </TabsTrigger>
        <TabsTrigger value="estado" className="uppercase text-sm">
          estado
        </TabsTrigger>
        <TabsTrigger value="health" className="uppercase text-sm">
          health check
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cidade">
        <CitySearch inicialCity={selectCity} />
      </TabsContent>
      <TabsContent value="estado">
        <StateSearch
          onSelectCity={(city) => {
            setSelectCity(city);
            setTab("cidade");
          }}
        />
      </TabsContent>
      <TabsContent value="health">
        <HealthCheck />
      </TabsContent>
    </Tabs>
  );
}
