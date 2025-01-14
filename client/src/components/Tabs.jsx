import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";

//dynimically render the className
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div>
      <TabGroup>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected()}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",
                  selected
                    ? "text-red-700  border-b-2 border-red-600"
                    : "text-gray-800  hover:text-red-800"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </TabList>
        <TabPanels className="w-full mt-2">{children}</TabPanels>
      </TabGroup>
    </div>
  );
}
