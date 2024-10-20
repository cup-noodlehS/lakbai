import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { MapLineSegment } from '@/interface/map'
import { fetchAnnotationDetails } from '@/tests/mock-api/mock-annotation-api'

interface PropsInterface {
    selectedLineSegment: MapLineSegment
    closeAnnotationDetails: () => void
}

function AnnotationDetails(props: PropsInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { selectedLineSegment, closeAnnotationDetails } = props

    const selectedLineSegmentAnnotation =
        fetchAnnotationDetails(selectedLineSegment)

    return (
        <div className="absolute z-50 left-0 top-0 h-lvh p-4 w-full sm:w-fit pointer-events-auto">
            <div className="flex flex-col p-3 gap-2 bg-white border border-black rounded-md shadow-2xl h-full w-full sm:w-[470px]">
                <div className="flex justify-between items-start p-2">
                    <h1 className="font-semibold text-2xl">
                        {selectedLineSegmentAnnotation.name}
                    </h1>
                    <button
                        onClick={closeAnnotationDetails}
                        className="bg-primary rounded-md border-2 border-black
                    duration-100 ease-in-out hover:translate-x-1 hover:-translate-y-1 hover:shadow-[-5px_5px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <Icon
                            icon="material-symbols:close-rounded"
                            className="w-5 h-5"
                        />
                    </button>
                </div>

                <div className="flex flex-col overflow-y-auto custom-scrollbar gap-2 grow">
                    <div className="flex flex-col px-3">
                        <p>
                            Nearest Street:{' '}
                            <b>{selectedLineSegmentAnnotation.nearestStreet}</b>
                        </p>
                        <p className="text-slate-400">
                            Annotated by:{' '}
                            <span className="font-semibold">
                                {selectedLineSegmentAnnotation.anotator}
                            </span>
                        </p>
                        <p className="text-slate-400">
                            Start Coordinates: <br /> (
                            {
                                selectedLineSegmentAnnotation.coordinates.start
                                    .lat
                            }
                            ,{' '}
                            {
                                selectedLineSegmentAnnotation.coordinates.start
                                    .lng
                            }{' '}
                            )
                        </p>
                        <p className="text-slate-400">
                            End Coordinates: <br />(
                            {selectedLineSegmentAnnotation.coordinates.end.lat},{' '}
                            {selectedLineSegmentAnnotation.coordinates.end.lng}{' '}
                            )
                        </p>
                        <p className="text-slate-400">
                            Width: {selectedLineSegmentAnnotation.sidewalkWidth}{' '}
                            inches
                        </p>
                    </div>
                    <div className="flex px-3 gap-3 font-semibold text-lg items-center">
                        <div
                            className={`w-6 h-6 rounded-md border-2 border-black
                            bg-level-${selectedLineSegmentAnnotation.level}`}
                        ></div>
                        {selectedLineSegmentAnnotation.walkability}
                    </div>
                    <div className="flex flex-col gap-1 p-3">
                        <p className="text-lg font-semibold">
                            Accessibility features
                        </p>
                        {selectedLineSegmentAnnotation.accessibility.map(
                            (accessibility, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 pl-2"
                                >
                                    <Icon
                                        icon={
                                            accessibility.checked
                                                ? 'material-symbols:check-circle-outline'
                                                : 'mdi:close-circle-outline'
                                        }
                                        className={`w-6 h-6
                                    ${
                                        accessibility.checked
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }`}
                                    />
                                    <p>{accessibility.label}</p>
                                </div>
                            )
                        )}
                    </div>
                    <div className="flex flex-col gap-1 p-3">
                        <p className="text-lg font-semibold">Obstructions</p>
                        <ul className="list-disc list-inside pl-2">
                            {selectedLineSegmentAnnotation.obstructions.map(
                                (obstruction, index) => (
                                    <li key={index}>{obstruction}</li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1 p-3">
                        <p className="text-lg font-semibold">Comments</p>
                        <p>{selectedLineSegmentAnnotation.comments}</p>
                    </div>
                </div>
                <div className="min-h-[210px] flex gap-2 overflow-x-auto custom-scrollbar overflow-y-hidden pb-4">
                    {selectedLineSegmentAnnotation.imagesUrls.map(
                        (imageUrl, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[150px] h-[200px] relative"
                            >
                                <Image
                                    src={imageUrl}
                                    alt={`annotation image ${index + 1}`}
                                    fill
                                    sizes="150px"
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                    className="rounded-md"
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default AnnotationDetails
