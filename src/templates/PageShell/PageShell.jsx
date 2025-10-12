import { Header, Footer} from '@/components';
import styles from './PageShell.module.css';
import {SideNav} from "@/routes";
import {useConfig} from "@/providers";


const PageShell = ({ children, links }) => {
    const {PAGE_LINKS} = useConfig();
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.content}>
                <SideNav links={PAGE_LINKS} />
                <main className={styles.main}>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default PageShell;