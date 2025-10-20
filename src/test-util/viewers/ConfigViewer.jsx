import { useConfig } from '@/providers';
import styles from './viewers.module.css';

export default function ConfigViewer() {
    const config = useConfig();
    return (
        <div className={styles.root}>
            <div className={styles.section}>
                <div className={styles.title}>Configuration (read-only)</div>
                <pre className={styles.pre}>{JSON.stringify(config, null, 2)}</pre>
            </div>
        </div>
    );
}
