import { Header, Footer} from '@/components';
import styles from './PageShell.module.css';


const PageShell = ({ children, links }) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.content}>
                <main className={styles.main}>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default PageShell;