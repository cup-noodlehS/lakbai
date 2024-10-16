"use client";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "@/components/Sidebar";
import AnnotationForm from "@/components/AnnotationForm";
import SearchBar from "@/components/SearchBar";
import AnnotationDetails from "./AnnotationDetails";

const AppLayer = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [screenWidth, setScreenWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [expandSidebar, setExpandSidebar] = useState(!isMobile);
    const [isPickingLocation, setIsPickingLocation] = useState(false);
    const [showAnnotationForm, setShowAnnotationForm] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pickedCoordinates, setPickedCoordinates] = useState<
        [number, number] | null
    >([10.298684, 123.898283]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedAnnotationId, setSelectedAnnotationId] = useState<
        number | null
    >(null);
    const pickLocation = () => {
        setIsPickingLocation(true);
        setExpandSidebar(false);
        setSelectedAnnotationId(null);
        console.log("here", isPickingLocation);
    };

    const cancelPickLocation = () => {
        setIsPickingLocation(false);
        if (!isMobile) {
            setExpandSidebar(true);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveAnnotation = (data: any) => {
        console.log(data);
        setShowAnnotationForm(false);
        setIsPickingLocation(false);
        setExpandSidebar(true);
        setSelectedAnnotationId(1);
    };

    const closeAnnotationDetails = () => {
        setSelectedAnnotationId(null);
        if (!isMobile) {
            setExpandSidebar(true);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenWidth(width);
            setIsMobile(width < 768);
            setExpandSidebar(width >= 768);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (selectedAnnotationId) {
            setExpandSidebar(false);
            setIsPickingLocation(false);
            setShowAnnotationForm(false);
            setPickedCoordinates(null);
        }
    }, [selectedAnnotationId]);

    return (
        <div className={`absolute top-0 left-0 right-0 bottom-0 z-[100]`}>
            <div className="pointer-events-auto">
                {selectedAnnotationId === null && (
                    <Sidebar
                        expand={expandSidebar}
                        setExpandSidebar={setExpandSidebar}
                        pickLocation={pickLocation}
                        setSelectedAnnotationId={setSelectedAnnotationId}
                    />
                )}
            </div>
            {selectedAnnotationId === null && isMobile && (
                <SearchBar isMobile={isMobile} />
            )}
            {!isPickingLocation ? (
                <div className="absolute z-40 right-0 bottom-0 p-4 pointer-events-auto">
                    <button
                        onClick={pickLocation}
                        className="flex items-center justify-center p-3 bg-primary border-2 border-black rounded-full transition-all duration-100 ease-in-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
                    >
                        <Icon
                            icon="material-symbols:add-location-outline"
                            className="w-6 h-6"
                        />
                    </button>
                </div>
            ) : (
                <div className="flex p-4 gap-3 absolute z-40 bottom-0 w-full justify-between items-center pointer-events-auto">
                    {pickedCoordinates ? (
                        <div className="p-3 rounded-3xl bg-white border border-black shadow-lg">
                            {pickedCoordinates[0]}, {pickedCoordinates[1]}
                        </div>
                    ) : (
                        <div className="p-2 border-4 rounded-md border-black bg-primary">
                            <h1 className="sm:text-3xl text-xl font-bold">
                                Pick a location
                            </h1>
                        </div>
                    )}
                    <div className="flex gap-3">
                        <button
                            onClick={cancelPickLocation}
                            className="rounded-3xl p-3 bg-white shadow-lg hover:bg-slate-100 duration-100 ease-in-out"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setShowAnnotationForm(true)}
                            disabled={!pickedCoordinates}
                            className={`flex items-center justify-center p-3 bg-primary border-2 border-black rounded-full transition-all duration-100 ease-in-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
                                ${
                                    !pickedCoordinates
                                        ? "opacity-50 cursor-not-allowed hover:-translate-x-0 hover:-translate-y-0 hover:shadow-none"
                                        : ""
                                }`}
                        >
                            <Icon
                                icon="material-symbols:check"
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                </div>
            )}
            {showAnnotationForm && pickedCoordinates && (
                <AnnotationForm
                    pickedCoordinates={pickedCoordinates}
                    setShowAnnotationForm={setShowAnnotationForm}
                    saveAnnotation={saveAnnotation}
                    setPickedCoordinates={setPickedCoordinates}
                />
            )}
            <AnimatePresence>
                {selectedAnnotationId && (
                    <motion.div
                        key={selectedAnnotationId}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AnnotationDetails
                            id={selectedAnnotationId}
                            closeAnnotationDetails={closeAnnotationDetails}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AppLayer;