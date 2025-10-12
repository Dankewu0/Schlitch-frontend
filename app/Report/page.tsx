import ReportForm from "@/app/_components/Report/ReportForm";
import styles from "./report.module.scss";

export default function ReportPage() {
    return (
        <main className={styles.main}>
            <section className={styles["report-section"]}>
                <ReportForm />
            </section>
        </main>
    );
}
