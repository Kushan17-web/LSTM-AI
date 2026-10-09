import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getCertificates } from "../../services/certificateService";

function Certificates() {

    const [certificates, setCertificates] = useState([]);

    useEffect(() => {

        loadCertificates();

    }, []);

    const loadCertificates = async () => {

        const data = await getCertificates();

        setCertificates(data.certificates);

    };

    return (

        <DashboardLayout>

            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">

                    🎓 Certificates

                </h1>

                <div className="grid md:grid-cols-2 gap-6">

                    {certificates.map((certificate) => (

                        <div

                            key={certificate._id}

                            className="bg-slate-900 rounded-2xl p-6"

                        >

                            <h2 className="text-2xl font-bold">

                                {certificate.course?.title}

                            </h2>

                            <p className="mt-3">

                                Score: {certificate.score}%

                            </p>

                            <p>

                                Certificate ID:

                                {certificate.certificateId}

                            </p>

                            <p>

                                Issued:

                                {new Date(
                                    certificate.issuedAt
                                ).toLocaleDateString()}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Certificates;