import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const PropertyPage = async ({ params }) => {
    await connectDB();
    const propertyDoc = await Property.findById(params.id).lean();
    const property = convertToSerializeableObject(propertyDoc);

    if (!property) {
        return (
            <h1 className='text-center text-2xl font-bold mt-10'>
                Property Not Found
            </h1>
        );
    }

    return (
        <>
            <PropertyHeaderImage
                image={property.images[0].url}
                thumbhash={property.images[0].thumbhash}
            />
            <section>
                <div className='container m-auto py-6 px-6'>
                    <Link
                        href='/properties'
                        className='text-blue-500 hover:text-blue-600 flex items-center'
                    >
                        <ArrowLeft className='mr-2' /> Back to Properties
                    </Link>
                </div>
            </section>
            <section className='bg-slate-100'>
                <div className='container m-auto py-10 px-6'>
                    <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                        <PropertyDetails property={property} />
                        <aside className='space-y-4'>
                            <ShareButtons property={property} />
                            <BookmarkButton property={property} />
                            <PropertyContactForm property={property} />
                        </aside>
                    </div>
                </div>
            </section>
            <PropertyImages images={property.images} />
        </>
    );
};
export default PropertyPage;
