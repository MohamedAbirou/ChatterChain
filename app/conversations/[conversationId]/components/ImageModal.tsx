"use client";

import LoadingModal from "@/app/components/LoadingModal";
import Modal from "@/app/components/Modal";
import Image from "next/image";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal = ({ isOpen, onClose, src }: ImageModalProps) => {
  if (!src) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-80 h-80">
          <Image alt="Image" className="object-contain" fill src={src} />
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
