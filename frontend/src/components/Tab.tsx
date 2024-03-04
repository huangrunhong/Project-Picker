import styles from "./Tab.module.scss";

type TabProps = {
  tabs: { value: string; label: string }[];
  selectedTab: string;
  setSelectedTab: (selectedTab: string) => void;
};

const Tab = ({ tabs, selectedTab, setSelectedTab }: TabProps) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setSelectedTab(tab.value)}
          className={selectedTab === tab.value ? styles.active : undefined}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
